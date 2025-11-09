import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Faculty } from '../../../modules/faculties/entities/faculties.entity';
import { University } from '../../../modules/universities/entities/universities.entity';
import { FACULTIES_SEED_DATA } from '../data/faculties.seed-data';

@Injectable()
export class FacultySeeder {
  constructor(
    @InjectRepository(Faculty)
    private readonly facultyRepository: Repository<Faculty>,
    @InjectRepository(University)
    private readonly universityRepository: Repository<University>,
  ) {}

  async run(): Promise<void> {
    console.log('🌱 Seeding faculties...');

    for (const facultyData of FACULTIES_SEED_DATA) {
      const existing = await this.facultyRepository.findOne({
        where: { code: facultyData.code as string },
      });

      if (!existing) {
        // Buscar la universidad por código
        const university = await this.universityRepository.findOne({
          where: { code: facultyData.universityCode },
        });

        if (!university) {
          console.log(
            `❌ University not found for code: ${facultyData.universityCode}`,
          );
          continue;
        }

        const faculty = this.facultyRepository.create({
          name: facultyData.name,
          code: facultyData.code,
          description: facultyData.description,
          isActive: facultyData.isActive,
          university,
        });

        await this.facultyRepository.save(faculty);
        console.log(`✅ Created faculty: ${facultyData.name}`);
      } else {
        console.log(`⏭️  Faculty already exists: ${facultyData.name}`);
      }
    }

    console.log('✨ Faculties seeding completed!\n');
  }

  async clear(): Promise<void> {
    console.log('🗑️  Clearing faculties...');
    await this.facultyRepository.createQueryBuilder().delete().execute();
    console.log('✅ Faculties cleared!\n');
  }
}
