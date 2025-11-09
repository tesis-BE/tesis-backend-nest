import * as bcrypt from 'bcrypt';
import { bcryptConfig } from '../../../config/bcrypt.config';

/**
 * Utilidades para el manejo seguro de contraseñas
 */
export class PasswordUtil {
  /**
   * Genera un hash de la contraseña usando bcrypt
   * @param plainPassword - Contraseña en texto plano
   * @returns Hash de la contraseña
   */
  static async hash(plainPassword: string): Promise<string> {
    const salt = await bcrypt.genSalt(bcryptConfig.saltRounds);
    return bcrypt.hash(plainPassword, salt);
  }

  /**
   * Compara una contraseña en texto plano con un hash
   * @param plainPassword - Contraseña en texto plano
   * @param hashedPassword - Hash almacenado
   * @returns true si coinciden, false si no
   */
  static async compare(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  /**
   * Valida la fortaleza de una contraseña
   * @param password - Contraseña a validar
   * @returns true si cumple con los requisitos mínimos
   */
  static validateStrength(password: string): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push('La contraseña debe tener al menos 8 caracteres');
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('La contraseña debe contener al menos una letra mayúscula');
    }

    if (!/[a-z]/.test(password)) {
      errors.push('La contraseña debe contener al menos una letra minúscula');
    }

    if (!/[0-9]/.test(password)) {
      errors.push('La contraseña debe contener al menos un número');
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('La contraseña debe contener al menos un carácter especial');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
