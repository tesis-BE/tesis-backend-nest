import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne, // 👈 Importar
  JoinColumn, // 👈 Importar
  OneToOne, // 👈 Importar
  ManyToMany, // 👈 Importar
  JoinTable, // 👈 Importar
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Question } from '../../questions/entities/questions.entities';
import { File } from '../../file/entities/file.entity';
import { QuestionOption } from '../../questions/entities/question-option.entity';
@Entity('answers')
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;
  // 👇 Para respuestas tipo 'text'
  @Column({ type: 'text', nullable: true })
  value: string;

  // 👇 Quién dio esta respuesta
  @ManyToOne(() => User, (user) => user.answers)
  @JoinColumn({ name: 'user_id' })
  user: User;

  // 👇 A qué pregunta se está respondiendo
  @ManyToOne(() => Question, (question) => question.answers)
  @JoinColumn({ name: 'question_id' })
  question: Question;

  // 👇 Para respuestas tipo 'file'
  @OneToOne(() => File, { cascade: true, nullable: true })
  @JoinColumn({ name: 'file_id' })
  file: File;

  // 👇 Para 'multiple-choice', 'checkbox', 'dropdown'
  @ManyToMany(() => QuestionOption, (option) => option.answers, {
    cascade: true,
  })
  @JoinTable({
    name: 'answer_selected_options', // Tabla pivote
    joinColumn: { name: 'answer_id' },
    inverseJoinColumn: { name: 'option_id' },
  })
  selectedOptions: QuestionOption[];
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
