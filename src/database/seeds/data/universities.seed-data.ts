import type { DeepPartial } from 'typeorm';
import type { University } from '../../../modules/universities/entities/universities.entity';

export const UNIVERSITIES_SEED_DATA: DeepPartial<University>[] = [
  {
    name: 'Universidad Laica Eloy Alfaro de Manabí',
    code: 'ULEAM',
    description: 'Universidad uleam principal de Ecuador',
    isActive: true,
  },
  {
    name: 'Universidad técnica de Manabí',
    code: 'UTM',
    description: 'Universidad utm principal de Ecuador',
    isActive: true,
  },
];
