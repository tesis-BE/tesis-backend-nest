import type { DeepPartial } from 'typeorm';
import type { Faculty } from '../../../modules/faculties/entities/faculties.entity';

export type FacultySeedData = DeepPartial<Faculty> & {
  universityCode: string; // Referencia al código de universidad
};

export const FACULTIES_SEED_DATA: FacultySeedData[] = [
  // UNI
  {
    name: 'Facultad de Ingeniería Industrial y de Sistemas',
    code: 'FIIS',
    description: 'Facultad especializada en ingeniería industrial',
    isActive: true,
    universityCode: 'UNI',
  },
  {
    name: 'Facultad de Ciencias',
    code: 'FC',
    description: 'Facultad de ciencias básicas',
    isActive: true,
    universityCode: 'UNI',
  },
  // UNMSM
  {
    name: 'Facultad de Ingeniería de Sistemas e Informática',
    code: 'FISI',
    description: 'Facultad de sistemas',
    isActive: true,
    universityCode: 'UNMSM',
  },
  {
    name: 'Facultad de Ciencias Matemáticas',
    code: 'FCM',
    description: 'Facultad de matemáticas',
    isActive: true,
    universityCode: 'UNMSM',
  },
  // PUCP
  {
    name: 'Facultad de Ciencias e Ingeniería',
    code: 'FCI',
    description: 'Facultad de ingeniería',
    isActive: true,
    universityCode: 'PUCP',
  },
];
