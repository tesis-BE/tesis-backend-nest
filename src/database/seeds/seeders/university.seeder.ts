import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { University } from '../../../modules/universities/entities/universities.entity';
import { UNIVERSITIES_SEED_DATA } from '../data/universities.seed-data';

@Injectable()
export class UniversitySeeder {
  constructor(
    @InjectRepository(University)
    private readonly universityRepository: Repository<University>,
  ) {}

  async run(): Promise<void> {
    console.log('🌱 Seeding universities...');

    for (const universityData of UNIVERSITIES_SEED_DATA) {
      const existing = await this.universityRepository.findOne({
        where: { code: universityData.code as string },
      });

      if (!existing) {
        const university = this.universityRepository.create(universityData);
        await this.universityRepository.save(university);
        console.log(`✅ Created university: ${universityData.name}`);
      } else {
        console.log(`⏭️  University already exists: ${universityData.name}`);
      }
    }

    console.log('✨ Universities seeding completed!\n');
  }

  async clear(): Promise<void> {
    console.log('🗑️  Clearing universities...');
    await this.universityRepository.createQueryBuilder().delete().execute();
    console.log('✅ Universities cleared!\n');
  }
}
