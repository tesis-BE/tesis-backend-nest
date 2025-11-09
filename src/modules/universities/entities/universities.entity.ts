import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Faculty } from 'src/modules/faculties/entities/faculties.entity';

@Entity('universities')
export class University {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;
  @Column({ nullable: true })
  code: string;
  @Column({ nullable: true })
  description: string;
  @Column({ default: true })
  isActive: boolean;
  @OneToMany(() => Faculty, (faculty) => faculty.university)
  faculties: Faculty[];
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
