import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CareerDetails } from '../../users/entities/career-details.entity';
import { Faculty } from '../../faculties/entities/faculties.entity';

@Entity('careers')
export class Career {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  code: string;

  @Column({ nullable: true })
  description: string;

  @OneToOne(() => CareerDetails, (careerDetails) => careerDetails.career, {
    nullable: true,
  })
  careerDetails: CareerDetails;

  @ManyToOne(() => Faculty, (faculty) => faculty.careers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'faculty_id' })
  faculty: Faculty;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
