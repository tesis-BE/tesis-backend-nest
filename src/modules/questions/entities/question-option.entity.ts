import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
} from 'typeorm';
import { Question } from './questions.entities';
import { Answer } from '../../answers/entities/answers.entity';

@Entity('question_options')
export class QuestionOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' }) // El texto de la opción (ej: 'Javascript', 'Python')
  value: string;

  // 👇 A qué pregunta pertenece esta opción
  @ManyToOne(() => Question, (question) => question.options)
  @JoinColumn({ name: 'question_id' })
  question: Question;

  // 👇 Relación inversa a las respuestas que seleccionaron esta opción
  @ManyToMany(() => Answer, (answer) => answer.selectedOptions)
  answers: Answer[];
}
