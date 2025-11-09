import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from '../../modules/permission/entities/permission.entity';
import { Role } from '../../modules/role/entities/role.entity';
import { University } from '../../modules/universities/entities/universities.entity';
import { Faculty } from '../../modules/faculties/entities/faculties.entity';
import { Career } from '../../modules/careers/entities/careers.entity';
import { User } from '../../modules/users/entities/user.entity';
import { ContactDetails } from '../../modules/users/entities/contact-details.entity';
import { CareerDetails } from '../../modules/users/entities/career-details.entity';
import { File } from '../../modules/file/entities/file.entity';
import { Survey } from '../../modules/surveys/entities/suveys.entity';
import { Question } from '../../modules/questions/entities/questions.entities';
import { QuestionOption } from '../../modules/questions/entities/question-option.entity';
import { SeedService } from './seed.service';
import { PermissionSeeder } from './seeders/permission.seeder';
import { RoleSeeder } from './seeders/role.seeder';
import { UniversitySeeder } from './seeders/university.seeder';
import { FacultySeeder } from './seeders/faculty.seeder';
import { CareerSeeder } from './seeders/career.seeder';
import { UserSeeder } from './seeders/user.seeder';
import { ContactDetailsSeeder } from './seeders/contact-details.seeder';
import { CareerDetailsSeeder } from './seeders/career-details.seeder';
import { FileSeeder } from './seeders/file.seeder';
import { SurveySeeder } from './seeders/survey.seeder';
import { QuestionSeeder } from './seeders/question.seeder';
import { QuestionOptionSeeder } from './seeders/question-option.seeder';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Permission,
      Role,
      University,
      Faculty,
      Career,
      User,
      ContactDetails,
      CareerDetails,
      File,
      Survey,
      Question,
      QuestionOption,
    ]),
  ],
  providers: [
    SeedService,
    PermissionSeeder,
    RoleSeeder,
    UniversitySeeder,
    FacultySeeder,
    CareerSeeder,
    UserSeeder,
    ContactDetailsSeeder,
    CareerDetailsSeeder,
    FileSeeder,
    SurveySeeder,
    QuestionSeeder,
    QuestionOptionSeeder,
  ],
  exports: [SeedService],
})
export class SeedModule {}
