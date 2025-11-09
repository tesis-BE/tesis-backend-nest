import type { DeepPartial } from 'typeorm';
import type { Career } from '../../../modules/careers/entities/careers.entity';

export type CareerSeedData = DeepPartial<Career> & {
  facultyCode: string; // Referencia al código de facultad
};

export const CAREERS_SEED_DATA: CareerSeedData[] = [
  // FIIS - UNI
  {
    name: 'Ingeniería Industrial',
    code: 'IND',
    description: 'Carrera de ingeniería industrial',
    isActive: true,
    facultyCode: 'FIIS',
  },
  {
    name: 'Ingeniería de Sistemas',
    code: 'SIS',
    description: 'Carrera de ingeniería de sistemas',
    isActive: true,
    facultyCode: 'FIIS',
  },
  // FC - UNI
  {
    name: 'Física',
    code: 'FIS',
    description: 'Carrera de física',
    isActive: true,
    facultyCode: 'FC',
  },
  {
    name: 'Matemática',
    code: 'MAT',
    description: 'Carrera de matemática',
    isActive: true,
    facultyCode: 'FC',
  },
  // FISI - UNMSM
  {
    name: 'Ingeniería de Software',
    code: 'IS',
    description: 'Carrera de ingeniería de software',
    isActive: true,
    facultyCode: 'FISI',
  },
  // FCI - PUCP
  {
    name: 'Ingeniería Informática',
    code: 'INF',
    description: 'Carrera de ingeniería informática',
    isActive: true,
    facultyCode: 'FCI',
  },
];
