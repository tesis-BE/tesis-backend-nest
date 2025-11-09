import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ContactDetails } from './contact-details.entity';
import { CareerDetails } from './career-details.entity';
import { Role } from '../../role/entities/role.entity';
import { Survey } from '../../surveys/entities/suveys.entity';
import { Answer } from '../../answers/entities/answers.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  identification: string;

  @Column()
  password: string;

  @ManyToMany(() => Role, {
    eager: true,
    cascade: true,
  })
  @JoinTable({
    name: 'userRoles',
    joinColumn: { name: 'userId' },
    inverseJoinColumn: { name: 'roleId' },
  })
  roles: Role[];

  @OneToMany(() => ContactDetails, (contact: ContactDetails) => contact.user, {
    cascade: true,
  })
  contactDetails: ContactDetails[];

  @OneToMany(() => CareerDetails, (careerDetail) => careerDetail.user, {
    cascade: true,
  })
  careerDetails: CareerDetails[];

  @OneToMany(() => Survey, (survey) => survey.createdBy)
  createdSurveys: Survey[];

  @OneToMany(() => Survey, (survey) => survey.updatedBy)
  updatedSurveys: Survey[];

  @OneToMany(() => Answer, (answer) => answer.user)
  answers: Answer[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
