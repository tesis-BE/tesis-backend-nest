import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Survey } from '../../../modules/surveys/entities/suveys.entity';
import { User } from '../../../modules/users/entities/user.entity';
import { SURVEYS_SEED_DATA } from '../data/surveys.seed-data';

@Injectable()
export class SurveySeeder {
  constructor(
    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async run(): Promise<void> {
    console.log('🌱 Seeding surveys...');

    for (const surveyData of SURVEYS_SEED_DATA) {
      const existing = await this.surveyRepository.findOne({
        where: { title: surveyData.title as string },
      });

      if (!existing) {
        // Buscar el usuario creador
        const creator = await this.userRepository.findOne({
          where: { identification: surveyData.createdByIdentification },
        });

        if (!creator) {
          console.log(
            `❌ Creator not found for identification: ${surveyData.createdByIdentification}`,
          );
          continue;
        }

        const survey = this.surveyRepository.create({
          title: surveyData.title,
          description: surveyData.description,
          isActive: surveyData.isActive,
          createdBy: creator,
        });

        await this.surveyRepository.save(survey);
        console.log(`✅ Created survey: ${surveyData.title}`);
      } else {
        console.log(`⏭️  Survey already exists: ${surveyData.title}`);
      }
    }

    console.log('✨ Surveys seeding completed!\n');
  }

  async clear(): Promise<void> {
    console.log('🗑️  Clearing surveys...');
    await this.surveyRepository.createQueryBuilder().delete().execute();
    console.log('✅ Surveys cleared!\n');
  }
}
