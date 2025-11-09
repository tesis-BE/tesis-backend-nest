import type { DeepPartial } from 'typeorm';
import type { Survey } from '../../../modules/surveys/entities/suveys.entity';

export type SurveySeedData = DeepPartial<Survey> & {
  createdByIdentification: string; // Referencia al identification del creador
};

export const SURVEYS_SEED_DATA: SurveySeedData[] = [
  {
    title: 'Encuesta de Satisfacción Estudiantil 2024',
    description:
      'Encuesta para medir la satisfacción de los estudiantes con los servicios universitarios',
    isActive: true,
    createdByIdentification: 'admin001',
  },
  {
    title: 'Evaluación de Cursos',
    description: 'Evaluación de la calidad de los cursos y profesores',
    isActive: true,
    createdByIdentification: '11223344',
  },
  {
    title: 'Encuesta de Inserción Laboral',
    description: 'Encuesta sobre la situación laboral de egresados',
    isActive: true,
    createdByIdentification: 'admin001',
  },
];
