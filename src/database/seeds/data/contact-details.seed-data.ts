import type { DeepPartial } from 'typeorm';
import type { ContactDetails } from '../../../modules/users/entities/contact-details.entity';

export type ContactDetailsSeedData = DeepPartial<ContactDetails> & {
  userIdentification: string; // Referencia al identification del usuario
};

export const CONTACT_DETAILS_SEED_DATA: ContactDetailsSeedData[] = [
  // Admin
  {
    type: 'email',
    value: 'admin@tesis.com',
    isActive: true,
    userIdentification: 'admin001',
  },
  {
    type: 'phone',
    value: '+51999999999',
    isActive: true,
    userIdentification: 'admin001',
  },
  // Juan Pérez
  {
    type: 'email',
    value: 'juan.perez@estudiante.com',
    isActive: true,
    userIdentification: '12345678',
  },
  {
    type: 'phone',
    value: '+51987654321',
    isActive: true,
    userIdentification: '12345678',
  },
  {
    type: 'email',
    value: 'juanp@estudiante.com',
    isActive: true,
    userIdentification: '12345678',
  },
  {
    type: 'phone',
    value: '+51987654322',
    isActive: true,
    userIdentification: '12345678',
  },
  // María González
  {
    type: 'email',
    value: 'maria.gonzalez@estudiante.com',
    isActive: true,
    userIdentification: '87654321',
  },
  // Carlos Rodríguez
  {
    type: 'email',
    value: 'carlos.rodriguez@admin.com',
    isActive: true,
    userIdentification: '11223344',
  },
  {
    type: 'phone',
    value: '+51912345678',
    isActive: true,
    userIdentification: '11223344',
  },
  // Ana Martínez
  {
    type: 'email',
    value: 'ana.martinez@estudiante.com',
    isActive: true,
    userIdentification: '44332211',
  },
];
