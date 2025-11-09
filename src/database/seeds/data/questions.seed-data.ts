import type { DeepPartial } from 'typeorm';
import type { Question } from '../../../modules/questions/entities/questions.entities';

export type QuestionSeedData = DeepPartial<Question> & {
  surveyTitle: string; // Referencia al título de la encuesta
};

export const QUESTIONS_SEED_DATA: QuestionSeedData[] = [
  // Encuesta de Satisfacción Estudiantil 2024
  {
    text: '¿Cómo calificarías la calidad de la enseñanza?',
    description: 'Evalúa la calidad general de la enseñanza en tu universidad',
    type: 'multiple-choice',
    isActive: true,
    surveyTitle: 'Encuesta de Satisfacción Estudiantil 2024',
  },
  {
    text: '¿Qué servicios universitarios utilizas?',
    description: 'Selecciona todos los que apliquen',
    type: 'checkbox',
    isActive: true,
    surveyTitle: 'Encuesta de Satisfacción Estudiantil 2024',
  },
  {
    text: 'Comentarios adicionales',
    description: 'Comparte tus opiniones o sugerencias',
    type: 'text',
    isActive: true,
    surveyTitle: 'Encuesta de Satisfacción Estudiantil 2024',
  },
  // Evaluación de Cursos
  {
    text: 'Selecciona el curso a evaluar',
    description: 'Elige el curso que deseas evaluar',
    type: 'dropdown',
    isActive: true,
    surveyTitle: 'Evaluación de Cursos',
  },
  {
    text: 'Sube tu certificado de estudios',
    description: 'Formato PDF',
    type: 'file',
    isActive: true,
    surveyTitle: 'Evaluación de Cursos',
  },
];
