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
import { User } from '../../users/entities/user.entity';
import { Question } from '../../questions/entities/questions.entities';
@Entity('surveys')
export class Survey {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  title: string;
  @Column({ nullable: true })
  description: string;

  // 👇 Quién creó la encuesta
  @ManyToOne(() => User, (user) => user.createdSurveys)
  @JoinColumn({ name: 'created_by_id' })
  createdBy: User;

  // 👇 Quién la editó por última vez
  @ManyToOne(() => User, (user) => user.updatedSurveys, { nullable: true })
  @JoinColumn({ name: 'updated_by_id' })
  updatedBy: User;

  // 👇 Relación a todas sus preguntas
  @OneToMany(() => Question, (question) => question.survey, { cascade: true })
  questions: Question[];
  @Column({ default: true })
  isActive: boolean;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
