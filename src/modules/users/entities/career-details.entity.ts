import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Career } from '../../careers/entities/careers.entity';

@Entity('careerDetails')
export class CareerDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', nullable: true })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate: Date;

  @Column({ nullable: true, default: false })
  isCompleted: boolean;

  @Column({ default: false })
  isCurrent: boolean;

  @OneToOne(() => Career, { eager: true })
  @JoinColumn({ name: 'career_id' })
  career: Career;

  @ManyToOne(() => User, (user) => user.careerDetails)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
