import type { DeepPartial } from 'typeorm';
import type { Permission } from '../../../modules/permission/entities/permission.entity';

export const PERMISSIONS_SEED_DATA: DeepPartial<Permission>[] = [
  // Permisos de usuarios
  {
    name: 'users.create',
    description: 'Crear usuarios',
    isActive: true,
    type: 'back',
    module: 'users',
  },
  {
    name: 'users.read',
    description: 'Leer usuarios',
    isActive: true,
    type: 'back',
    module: 'users',
  },
  {
    name: 'users.update',
    description: 'Actualizar usuarios',
    isActive: true,
    type: 'back',
    module: 'users',
  },
  {
    name: 'users.delete',
    description: 'Eliminar usuarios',
    isActive: true,
    type: 'back',
    module: 'users',
  },
  // Permisos de roles
  {
    name: 'roles.create',
    description: 'Crear roles',
    isActive: true,
    type: 'back',
    module: 'roles',
  },
  {
    name: 'roles.read',
    description: 'Leer roles',
    isActive: true,
    type: 'back',
    module: 'roles',
  },
  {
    name: 'roles.update',
    description: 'Actualizar roles',
    isActive: true,
    type: 'back',
    module: 'roles',
  },
  {
    name: 'roles.delete',
    description: 'Eliminar roles',
    isActive: true,
    type: 'back',
    module: 'roles',
  },
  // Permisos de encuestas
  {
    name: 'surveys.create',
    description: 'Crear encuestas',
    isActive: true,
    type: 'back',
    module: 'surveys',
  },
  {
    name: 'surveys.read',
    description: 'Leer encuestas',
    isActive: true,
    type: 'back',
    module: 'surveys',
  },
  {
    name: 'surveys.update',
    description: 'Actualizar encuestas',
    isActive: true,
    type: 'back',
    module: 'surveys',
  },
  {
    name: 'surveys.delete',
    description: 'Eliminar encuestas',
    isActive: true,
    type: 'back',
    module: 'surveys',
  },
];
