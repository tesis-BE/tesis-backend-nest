import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn, // 👈 1. Importar JoinColumn
  Unique, // 👈 2. Importar Unique
} from 'typeorm';
import { User } from './user.entity';

@Entity('contactDetails')
@Unique(['user', 'type'])
export class ContactDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ['email', 'phone'] })
  type: 'email' | 'phone';

  @Column({ unique: true })
  value: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => User, (user) => user.contactDetails, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
