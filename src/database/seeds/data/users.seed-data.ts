import type { DeepPartial } from 'typeorm';
import type { User } from '../../../modules/users/entities/user.entity';

export type UserSeedData = DeepPartial<User> & {
  roleNames: string[]; // Nombres de roles a asignar
  plainPassword: string; // Contraseña en texto plano (se hasheará)
};

export const USERS_SEED_DATA: UserSeedData[] = [
  {
    firstname: 'Super',
    lastname: 'Admin',
    identification: 'admin001',
    plainPassword: 'Admin123!',
    roleNames: ['Master'],
  },
  {
    firstname: 'Juan',
    lastname: 'Pérez',
    identification: '12345678',
    plainPassword: 'User123!',
    roleNames: ['Student'],
  },
  {
    firstname: 'María',
    lastname: 'González',
    identification: '87654321',
    plainPassword: 'User123!',
    roleNames: ['Student'],
  },
  {
    firstname: 'Carlos',
    lastname: 'Rodríguez',
    identification: '11223344',
    plainPassword: 'User123!',
    roleNames: ['Administer'],
  },
  {
    firstname: 'Ana',
    lastname: 'Martínez',
    identification: '44332211',
    plainPassword: 'User123!',
    roleNames: ['Teacher'],
  },
  {
    firstname: 'Joaquin',
    lastname: 'ZZZ',
    identification: '44332211',
    plainPassword: 'User123!',
    roleNames: ['Operator'],
  },
];
