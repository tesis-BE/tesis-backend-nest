import { HttpException, HttpStatus } from '@nestjs/common';
import { ResponseUtil } from './response.utils';

/**
 * Decorador para manejo automático de errores en métodos de controladores
 * Envuelve el método en un try-catch y retorna respuestas formateadas
 */
export function HandleErrors(customMessage?: string) {
  return function <T>(
    target: object,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<(...args: unknown[]) => Promise<T>>,
  ): TypedPropertyDescriptor<(...args: unknown[]) => Promise<T>> {
    const originalMethod = descriptor.value;

    if (!originalMethod) {
      return descriptor;
    }

    descriptor.value = async function (
      this: unknown,
      ...args: unknown[]
    ): Promise<T> {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const result = await originalMethod.apply(this, args);
        return result as T;
      } catch (error) {
        return handleError(error, customMessage) as T;
      }
    };

    return descriptor;
  };
}

/**
 * Interfaces para tipos de errores de TypeORM
 */
interface QueryFailedError extends Error {
  code?: string;
  detail?: string;
}

/**
 * Type guard para verificar si es un QueryFailedError
 */
function isQueryFailedError(error: unknown): error is QueryFailedError {
  return (
    error instanceof Error &&
    error.name === 'QueryFailedError' &&
    'code' in error
  );
}

/**
 * Type guard para verificar si tiene una propiedad message
 */
function hasMessage(obj: unknown): obj is { message: string } {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'message' in obj &&
    typeof (obj as { message: unknown }).message === 'string'
  );
}

/**
 * Función para manejar diferentes tipos de errores
 */
function handleError(error: unknown, customMessage?: string) {
  console.error('Error capturado:', error);

  // Si es una excepción HTTP de NestJS
  if (error instanceof HttpException) {
    const status = error.getStatus();
    const response = error.getResponse();
    const message =
      typeof response === 'string'
        ? response
        : hasMessage(response)
          ? response.message
          : error.message;

    return ResponseUtil.error(
      customMessage || message,
      status,
      typeof response === 'object' ? response : null,
    );
  }

  // Errores de validación de TypeORM
  if (isQueryFailedError(error)) {
    // Error de llave duplicada (PostgreSQL/MySQL)
    if (error.code === '23505' || error.code === 'ER_DUP_ENTRY') {
      return ResponseUtil.conflict(customMessage || 'El recurso ya existe', {
        detail: error.detail || error.message,
      });
    }

    // Error de llave foránea
    if (error.code === '23503' || error.code === 'ER_NO_REFERENCED_ROW_2') {
      return ResponseUtil.badRequest(
        customMessage || 'Referencia inválida a otro recurso',
        {
          detail: error.detail || error.message,
        },
      );
    }

    // Otros errores de base de datos
    return ResponseUtil.error(
      customMessage || 'Error en la base de datos',
      HttpStatus.INTERNAL_SERVER_ERROR,
      {
        detail: error.message,
      },
    );
  }

  // Error de entidad no encontrada (TypeORM)
  if (error instanceof Error && error.name === 'EntityNotFoundError') {
    return ResponseUtil.notFound(customMessage || 'Recurso no encontrado');
  }

  // Errores de validación de class-validator
  if (error instanceof Error && error.name === 'ValidationError') {
    return ResponseUtil.badRequest(
      customMessage || 'Error de validación',
      error,
    );
  }

  // Error genérico
  if (error instanceof Error) {
    return ResponseUtil.error(
      customMessage || error.message || 'Error interno del servidor',
      HttpStatus.INTERNAL_SERVER_ERROR,
      {
        name: error.name,
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
    );
  }

  // Error desconocido
  return ResponseUtil.error(
    customMessage || 'Error desconocido',
    HttpStatus.INTERNAL_SERVER_ERROR,
    error,
  );
}

/**
 * Función auxiliar para envolver funciones asíncronas con try-catch
 * Útil para usar fuera de decoradores
 */
export async function tryCatch<T>(
  fn: () => Promise<T>,
  customMessage?: string,
): Promise<T | ReturnType<typeof handleError>> {
  try {
    return await fn();
  } catch (error) {
    return handleError(error, customMessage);
  }
}

/**
 * Excepción personalizada para manejar errores de negocio
 */
export class BusinessException extends HttpException {
  constructor(
    message: string,
    statusCode: HttpStatus = HttpStatus.BAD_REQUEST,
  ) {
    super(message, statusCode);
  }
}
