import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne, // 👈 Importar
  JoinColumn, // 👈 Importar
  OneToMany, // 👈 Importar
} from 'typeorm';
import { Survey } from '../../surveys/entities/suveys.entity';
import { QuestionOption } from './question-option.entity'; // Ajusta la ruta
import { Answer } from '../../answers/entities/answers.entity';
@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'text' }) // El texto de la pregunta (ej: '¿Cuál es tu lenguaje favorito?')
  text: string;
  @Column({ nullable: true })
  description: string;
  @Column({
    type: 'enum',
    enum: ['text', 'multiple-choice', 'checkbox', 'dropdown', 'file'],
  })
  type: string;

  // 👇 Relación a la encuesta padre
  @ManyToOne(() => Survey, (survey) => survey.questions)
  @JoinColumn({ name: 'survey_id' })
  survey: Survey;

  // 👇 Opciones (para 'multiple-choice', 'checkbox', 'dropdown')
  @OneToMany(() => QuestionOption, (option) => option.question, {
    cascade: true,
  })
  options: QuestionOption[];

  // 👇 Todas las respuestas dadas a esta pregunta
  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];

  @Column({ default: true })
  isActive: boolean;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
