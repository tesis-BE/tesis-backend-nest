import type { DeepPartial } from 'typeorm';
import type { CareerDetails } from '../../../modules/users/entities/career-details.entity';

export type CareerDetailsSeedData = DeepPartial<CareerDetails> & {
  userIdentification: string; // Referencia al identification del usuario
  careerCode: string; // Referencia al código de carrera
};

export const CAREER_DETAILS_SEED_DATA: CareerDetailsSeedData[] = [
  {
    startDate: new Date('2020-03-01'),
    endDate: undefined,
    isCompleted: false,
    isCurrent: true,
    userIdentification: '12345678',
    careerCode: 'IND',
  },
  {
    startDate: new Date('2019-03-01'),
    endDate: undefined,
    isCompleted: false,
    isCurrent: true,
    userIdentification: '87654321',
    careerCode: 'SIS',
  },
  {
    startDate: new Date('2021-03-01'),
    endDate: undefined,
    isCompleted: false,
    isCurrent: true,
    userIdentification: '44332211',
    careerCode: 'IS',
  },
];
