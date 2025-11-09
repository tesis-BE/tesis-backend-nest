import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getDatabaseConfig } from './config/database.config';

//modules
import { UsersModule } from './modules/users/users.module';
import { CareersModule } from './modules/careers/careers.module';
import { FacultiesModule } from './modules/faculties/faculties.module';
import { UniversitiesModule } from './modules/universities/universities.module';
import { CompanyModule } from './modules/company/company.module';
import { RoleModule } from './modules/role/role.module';
import { PermissionModule } from './modules/permission/permission.module';
import { AuthModule } from './modules/auth/auth.module';
import { AnswersModule } from './modules/answers/answers.module';
import { SurveysModule } from './modules/surveys/surveys.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { ResumeModule } from './modules/resume/resume.module';
import { ChatModule } from './modules/chat/chat.module';
import { AplicationsModule } from './modules/aplications/aplications.module';
import { PostulationModule } from './modules/postulation/postulation.module';
import { BaseModule } from './modules/base/base.module';
import { FileModule } from './modules/file/file.module';
import { SeedModule } from './database/seeds/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        getDatabaseConfig(configService),
    }),
    UsersModule,
    CareersModule,
    FacultiesModule,
    UniversitiesModule,
    CompanyModule,
    RoleModule,
    PermissionModule,
    AuthModule,
    AnswersModule,
    SurveysModule,
    QuestionsModule,
    ResumeModule,
    ChatModule,
    AplicationsModule,
    PostulationModule,
    BaseModule,
    FileModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
