/**
 * Configuración de bcrypt para el hash de contraseñas
 */
export const bcryptConfig = {
  /**
   * Número de rondas de salt para bcrypt
   * - Valores recomendados: 10-12
   * - Mayor número = más seguro pero más lento
   * - 10 rondas: ~10ms
   * - 12 rondas: ~40ms
   * - 14 rondas: ~160ms
   */
  saltRounds: 12,
};
