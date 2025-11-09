import type { DeepPartial } from 'typeorm';
import type { QuestionOption } from '../../../modules/questions/entities/question-option.entity';

export type QuestionOptionSeedData = DeepPartial<QuestionOption> & {
  questionText: string; // Referencia al texto de la pregunta
};

export const QUESTION_OPTIONS_SEED_DATA: QuestionOptionSeedData[] = [
  // Opciones para "¿Cómo calificarías la calidad de la enseñanza?"
  {
    value: 'Excelente',
    questionText: '¿Cómo calificarías la calidad de la enseñanza?',
  },
  {
    value: 'Buena',
    questionText: '¿Cómo calificarías la calidad de la enseñanza?',
  },
  {
    value: 'Regular',
    questionText: '¿Cómo calificarías la calidad de la enseñanza?',
  },
  {
    value: 'Mala',
    questionText: '¿Cómo calificarías la calidad de la enseñanza?',
  },
  // Opciones para "¿Qué servicios universitarios utilizas?"
  {
    value: 'Biblioteca',
    questionText: '¿Qué servicios universitarios utilizas?',
  },
  {
    value: 'Laboratorios',
    questionText: '¿Qué servicios universitarios utilizas?',
  },
  {
    value: 'Comedor',
    questionText: '¿Qué servicios universitarios utilizas?',
  },
  {
    value: 'Gimnasio',
    questionText: '¿Qué servicios universitarios utilizas?',
  },
  {
    value: 'Tutorías',
    questionText: '¿Qué servicios universitarios utilizas?',
  },
  // Opciones para "Selecciona el curso a evaluar"
  {
    value: 'Programación I',
    questionText: 'Selecciona el curso a evaluar',
  },
  {
    value: 'Cálculo Diferencial',
    questionText: 'Selecciona el curso a evaluar',
  },
  {
    value: 'Física General',
    questionText: 'Selecciona el curso a evaluar',
  },
  {
    value: 'Química General',
    questionText: 'Selecciona el curso a evaluar',
  },
];
