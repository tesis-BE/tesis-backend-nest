import { Injectable } from '@nestjs/common';
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

@Injectable()
export class SeedService {
  constructor(
    private readonly permissionSeeder: PermissionSeeder,
    private readonly roleSeeder: RoleSeeder,
    private readonly universitySeeder: UniversitySeeder,
    private readonly facultySeeder: FacultySeeder,
    private readonly careerSeeder: CareerSeeder,
    private readonly userSeeder: UserSeeder,
    private readonly contactDetailsSeeder: ContactDetailsSeeder,
    private readonly careerDetailsSeeder: CareerDetailsSeeder,
    private readonly fileSeeder: FileSeeder,
    private readonly surveySeeder: SurveySeeder,
    private readonly questionSeeder: QuestionSeeder,
    private readonly questionOptionSeeder: QuestionOptionSeeder,
  ) {}

  /**
   * Ejecuta todos los seeders en orden
   */
  async runAll(): Promise<void> {
    console.log('\n🚀 Starting database seeding...\n');
    const startTime = Date.now();

    try {
      // Orden importante: primero las entidades independientes
      await this.permissionSeeder.run();
      await this.roleSeeder.run();
      await this.universitySeeder.run();
      await this.facultySeeder.run();
      await this.careerSeeder.run();
      await this.fileSeeder.run();
      await this.userSeeder.run();
      await this.contactDetailsSeeder.run();
      await this.careerDetailsSeeder.run();
      await this.surveySeeder.run();
      await this.questionSeeder.run();
      await this.questionOptionSeeder.run();

      const duration = ((Date.now() - startTime) / 1000).toFixed(2);
      console.log(`\n✨ Database seeding completed in ${duration}s!\n`);
    } catch (error) {
      console.error('\n❌ Error during seeding:', error);
      throw error;
    }
  }

  /**
   * Ejecuta un seeder específico
   */
  async runOne(seederName: string): Promise<void> {
    console.log(`\n🚀 Running ${seederName} seeder...\n`);

    const seeders: Record<string, () => Promise<void>> = {
      permission: () => this.permissionSeeder.run(),
      role: () => this.roleSeeder.run(),
      university: () => this.universitySeeder.run(),
      faculty: () => this.facultySeeder.run(),
      career: () => this.careerSeeder.run(),
      file: () => this.fileSeeder.run(),
      user: () => this.userSeeder.run(),
      'contact-details': () => this.contactDetailsSeeder.run(),
      'career-details': () => this.careerDetailsSeeder.run(),
      survey: () => this.surveySeeder.run(),
      question: () => this.questionSeeder.run(),
      'question-option': () => this.questionOptionSeeder.run(),
    };

    const seeder = seeders[seederName.toLowerCase()];

    if (!seeder) {
      console.error(
        `❌ Seeder "${seederName}" not found. Available seeders: ${Object.keys(seeders).join(', ')}`,
      );
      return;
    }

    try {
      await seeder();
      console.log(`\n✨ ${seederName} seeding completed!\n`);
    } catch (error) {
      console.error(`\n❌ Error running ${seederName} seeder:`, error);
      throw error;
    }
  }

  /**
   * Limpia todos los datos de las tablas
   */
  async clearAll(): Promise<void> {
    console.log('\n🗑️  Clearing all data...\n');

    try {
      // Orden inverso para respetar las relaciones
      await this.questionOptionSeeder.clear();
      await this.questionSeeder.clear();
      await this.surveySeeder.clear();
      await this.careerDetailsSeeder.clear();
      await this.contactDetailsSeeder.clear();
      await this.userSeeder.clear();
      await this.fileSeeder.clear();
      await this.careerSeeder.clear();
      await this.facultySeeder.clear();
      await this.universitySeeder.clear();
      await this.roleSeeder.clear();
      await this.permissionSeeder.clear();

      console.log('\n✅ All data cleared!\n');
    } catch (error) {
      console.error('\n❌ Error clearing data:', error);
      throw error;
    }
  }

  /**
   * Limpia y vuelve a ejecutar todos los seeders
   */
  async refresh(): Promise<void> {
    console.log('\n🔄 Refreshing database...\n');

    await this.clearAll();
    await this.runAll();

    console.log('\n✨ Database refresh completed!\n');
  }
}
