import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Career } from '../../../modules/careers/entities/careers.entity';
import { Faculty } from '../../../modules/faculties/entities/faculties.entity';
import { CAREERS_SEED_DATA } from '../data/careers.seed-data';

@Injectable()
export class CareerSeeder {
  constructor(
    @InjectRepository(Career)
    private readonly careerRepository: Repository<Career>,
    @InjectRepository(Faculty)
    private readonly facultyRepository: Repository<Faculty>,
  ) {}

  async run(): Promise<void> {
    console.log('🌱 Seeding careers...');

    for (const careerData of CAREERS_SEED_DATA) {
      const existing = await this.careerRepository.findOne({
        where: { code: careerData.code as string },
      });

      if (!existing) {
        // Buscar la facultad por código
        const faculty = await this.facultyRepository.findOne({
          where: { code: careerData.facultyCode },
        });

        if (!faculty) {
          console.log(
            `❌ Faculty not found for code: ${careerData.facultyCode}`,
          );
          continue;
        }

        const career = this.careerRepository.create({
          name: careerData.name,
          code: careerData.code,
          description: careerData.description,
          isActive: careerData.isActive,
          faculty,
        });

        await this.careerRepository.save(career);
        console.log(`✅ Created career: ${careerData.name}`);
      } else {
        console.log(`⏭️  Career already exists: ${careerData.name}`);
      }
    }

    console.log('✨ Careers seeding completed!\n');
  }

  async clear(): Promise<void> {
    console.log('🗑️  Clearing careers...');
    await this.careerRepository.createQueryBuilder().delete().execute();
    console.log('✅ Careers cleared!\n');
  }
}
