import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CareerDetails } from '../../../modules/users/entities/career-details.entity';
import { User } from '../../../modules/users/entities/user.entity';
import { Career } from '../../../modules/careers/entities/careers.entity';
import { CAREER_DETAILS_SEED_DATA } from '../data/career-details.seed-data';

@Injectable()
export class CareerDetailsSeeder {
  constructor(
    @InjectRepository(CareerDetails)
    private readonly careerDetailsRepository: Repository<CareerDetails>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Career)
    private readonly careerRepository: Repository<Career>,
  ) {}

  async run(): Promise<void> {
    console.log('🌱 Seeding career details...');

    for (const careerDetailData of CAREER_DETAILS_SEED_DATA) {
      // Buscar el usuario por identification
      const user = await this.userRepository.findOne({
        where: { identification: careerDetailData.userIdentification },
      });

      if (!user) {
        console.log(
          `❌ User not found for identification: ${careerDetailData.userIdentification}`,
        );
        continue;
      }

      // Buscar la carrera por código
      const career = await this.careerRepository.findOne({
        where: { code: careerDetailData.careerCode },
      });

      if (!career) {
        console.log(
          `❌ Career not found for code: ${careerDetailData.careerCode}`,
        );
        continue;
      }

      // Verificar si ya existe
      const existing = await this.careerDetailsRepository.findOne({
        where: {
          user: { id: user.id },
          career: { id: career.id },
        },
      });

      if (!existing) {
        const careerDetails = this.careerDetailsRepository.create({
          startDate: careerDetailData.startDate,
          endDate: careerDetailData.endDate,
          isCompleted: careerDetailData.isCompleted,
          isCurrent: careerDetailData.isCurrent,
          user,
          career,
        });

        await this.careerDetailsRepository.save(careerDetails);
        console.log(
          `✅ Created career detail for user: ${user.firstname} - ${career.name}`,
        );
      } else {
        console.log(
          `⏭️  Career detail already exists for: ${user.firstname} - ${career.name}`,
        );
      }
    }

    console.log('✨ Career details seeding completed!\n');
  }

  async clear(): Promise<void> {
    console.log('🗑️  Clearing career details...');
    await this.careerDetailsRepository.createQueryBuilder().delete().execute();
    console.log('✅ Career details cleared!\n');
  }
}
