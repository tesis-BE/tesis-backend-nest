import { HttpStatus } from '@nestjs/common';

export interface ApiResponse<T = any> {
  statusCode: number;
  message: string;
  data?: T;
  meta?: {
    timestamp: string;
    path?: string;
    [key: string]: any;
  };
}

export class ResponseUtil {
  /**
   * Respuesta exitosa gen�rica
   */
  static success<T>(
    data: T,
    message: string = 'Operaci�n exitosa',
    statusCode: number = HttpStatus.OK,
    meta?: Record<string, any>,
  ): ApiResponse<T> {
    return {
      statusCode,
      message,
      data,
      meta: {
        timestamp: new Date().toISOString(),
        ...meta,
      },
    };
  }

  /**
   * Respuesta para creaci�n exitosa (201)
   */
  static created<T>(
    data: T,
    message: string = 'Recurso creado exitosamente',
    meta?: Record<string, any>,
  ): ApiResponse<T> {
    return this.success(data, message, HttpStatus.CREATED, meta);
  }

  /**
   * Respuesta para obtener un recurso (200)
   */
  static ok<T>(
    data: T,
    message: string = 'Recurso obtenido exitosamente',
    meta?: Record<string, any>,
  ): ApiResponse<T> {
    return this.success(data, message, HttpStatus.OK, meta);
  }

  /**
   * Respuesta para actualizaci�n exitosa (200)
   */
  static updated<T>(
    data: T,
    message: string = 'Recurso actualizado exitosamente',
    meta?: Record<string, any>,
  ): ApiResponse<T> {
    return this.success(data, message, HttpStatus.OK, meta);
  }

  /**
   * Respuesta para eliminaci�n exitosa (200)
   */
  static deleted(
    message: string = 'Recurso eliminado exitosamente',
    meta?: Record<string, any>,
  ): ApiResponse<null> {
    return this.success(null, message, HttpStatus.OK, meta);
  }

  /**
   * Respuesta para lista de recursos (200)
   */
  static list<T>(
    data: T[],
    message: string = 'Lista obtenida exitosamente',
    meta?: Record<string, any>,
  ): ApiResponse<T[]> {
    return this.success(data, message, HttpStatus.OK, {
      total: data.length,
      ...meta,
    });
  }

  /**
   * Respuesta para lista paginada
   */
  static paginated<T>(
    data: T[],
    total: number,
    page: number,
    limit: number,
    message: string = 'Lista paginada obtenida exitosamente',
    meta?: Record<string, any>,
  ): ApiResponse<T[]> {
    return this.success(data, message, HttpStatus.OK, {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      ...meta,
    });
  }

  /**
   * Respuesta de error gen�rica
   */
  static error<E = unknown>(
    message: string = 'Error en la operaci�n',
    statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR,
    errors?: E,
    meta?: Record<string, any>,
  ): ApiResponse<E | null> {
    return {
      statusCode,
      message,
      data: errors || null,
      meta: {
        timestamp: new Date().toISOString(),
        ...meta,
      },
    };
  }

  /**
   * Respuesta para recurso no encontrado (404)
   */
  static notFound(
    message: string = 'Recurso no encontrado',
    meta?: Record<string, any>,
  ): ApiResponse<null> {
    return this.error(message, HttpStatus.NOT_FOUND, null, meta);
  }

  /**
   * Respuesta para solicitud inv�lida (400)
   */
  static badRequest<E = unknown>(
    message: string = 'Solicitud inv�lida',
    errors?: E,
    meta?: Record<string, any>,
  ): ApiResponse<E | null> {
    return this.error(message, HttpStatus.BAD_REQUEST, errors, meta);
  }

  /**
   * Respuesta para no autorizado (401)
   */
  static unauthorized(
    message: string = 'No autorizado',
    meta?: Record<string, any>,
  ): ApiResponse<null> {
    return this.error(message, HttpStatus.UNAUTHORIZED, null, meta);
  }

  /**
   * Respuesta para prohibido (403)
   */
  static forbidden(
    message: string = 'Acceso prohibido',
    meta?: Record<string, any>,
  ): ApiResponse<null> {
    return this.error(message, HttpStatus.FORBIDDEN, null, meta);
  }

  /**
   * Respuesta para conflicto (409)
   */
  static conflict<E = unknown>(
    message: string = 'Conflicto en la operaci�n',
    errors?: E,
    meta?: Record<string, any>,
  ): ApiResponse<E | null> {
    return this.error(message, HttpStatus.CONFLICT, errors, meta);
  }
}
