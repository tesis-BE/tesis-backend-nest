import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Career } from '../../careers/entities/careers.entity';
import { University } from 'src/modules/universities/entities/universities.entity';
@Entity('faculties')
export class Faculty {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  code: string;
  @Column({ unique: true })
  name: string;
  @Column({ nullable: true })
  description: string;
  @OneToMany(() => Career, (career) => career.faculty)
  careers: Career[];

  // 👇 7. AÑADIR LA RELACIÓN A UNIVERSITY
  @ManyToOne(() => University, (university) => university.faculties)
  @JoinColumn({ name: 'university_id' }) // Crea la columna 'university_id'
  university: University;
  @Column({ default: true })
  isActive: boolean;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
