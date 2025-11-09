import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionOption } from '../../../modules/questions/entities/question-option.entity';
import { Question } from '../../../modules/questions/entities/questions.entities';
import { QUESTION_OPTIONS_SEED_DATA } from '../data/question-options.seed-data';

@Injectable()
export class QuestionOptionSeeder {
  constructor(
    @InjectRepository(QuestionOption)
    private readonly questionOptionRepository: Repository<QuestionOption>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  async run(): Promise<void> {
    console.log('🌱 Seeding question options...');

    for (const optionData of QUESTION_OPTIONS_SEED_DATA) {
      // Buscar la pregunta por texto
      const question = await this.questionRepository.findOne({
        where: { text: optionData.questionText },
      });

      if (!question) {
        console.log(
          `❌ Question not found for text: ${optionData.questionText}`,
        );
        continue;
      }

      // Verificar si ya existe
      const existing = await this.questionOptionRepository.findOne({
        where: {
          value: optionData.value as string,
          question: { id: question.id },
        },
      });

      if (!existing) {
        const option = this.questionOptionRepository.create({
          value: optionData.value,
          question,
        });

        await this.questionOptionRepository.save(option);
        console.log(`✅ Created option: ${optionData.value}`);
      } else {
        console.log(`⏭️  Option already exists: ${optionData.value}`);
      }
    }

    console.log('✨ Question options seeding completed!\n');
  }

  async clear(): Promise<void> {
    console.log('🗑️  Clearing question options...');
    await this.questionOptionRepository.createQueryBuilder().delete().execute();
    console.log('✅ Question options cleared!\n');
  }
}
