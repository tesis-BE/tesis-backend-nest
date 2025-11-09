import type { DeepPartial } from 'typeorm';
import type { Role } from '../../../modules/role/entities/role.entity';

export const ROLES_SEED_DATA: DeepPartial<Role>[] = [
  {
    name: 'Master',
    description: 'Administrador con todos los permisos',
    isActive: true,
  },
  {
    name: 'Administer',
    description: 'Administrador del sistema',
    isActive: true,
  },
  {
    name: 'User',
    description: 'Usuario estándar',
    isActive: true,
  },
  {
    name: 'Student',
    description: 'Estudiante universitario',
    isActive: true,
  },
  {
    name: 'Teacher',
    description: 'Profesor universitario',
    isActive: true,
  },
  {
    name: 'Operator',
    description: 'Operador universitario',
    isActive: true,
  },
];
