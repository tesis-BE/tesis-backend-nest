import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../../../modules/questions/entities/questions.entities';
import { Survey } from '../../../modules/surveys/entities/suveys.entity';
import { QUESTIONS_SEED_DATA } from '../data/questions.seed-data';

@Injectable()
export class QuestionSeeder {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,
  ) {}

  async run(): Promise<void> {
    console.log('🌱 Seeding questions...');

    for (const questionData of QUESTIONS_SEED_DATA) {
      const existing = await this.questionRepository.findOne({
        where: { text: questionData.text as string },
      });

      if (!existing) {
        // Buscar la encuesta por título
        const survey = await this.surveyRepository.findOne({
          where: { title: questionData.surveyTitle },
        });

        if (!survey) {
          console.log(
            `❌ Survey not found for title: ${questionData.surveyTitle}`,
          );
          continue;
        }

        const question = this.questionRepository.create({
          text: questionData.text,
          description: questionData.description,
          type: questionData.type,
          isActive: questionData.isActive,
          survey,
        });

        await this.questionRepository.save(question);
        console.log(`✅ Created question: ${questionData.text}`);
      } else {
        console.log(`⏭️  Question already exists: ${questionData.text}`);
      }
    }

    console.log('✨ Questions seeding completed!\n');
  }

  async clear(): Promise<void> {
    console.log('🗑️  Clearing questions...');
    await this.questionRepository.createQueryBuilder().delete().execute();
    console.log('✅ Questions cleared!\n');
  }
}
