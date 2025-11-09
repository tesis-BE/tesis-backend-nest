import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/questions.entities';
import { QuestionOption } from './entities/question-option.entity';
import { QuestionsController } from './api/questions.controller';
import { QuestionsService } from './api/questions.service';
import { QuestionOptionsController } from './api/question-options.controller';
import { QuestionOptionsService } from './api/question-options.service';

@Module({
  imports: [TypeOrmModule.forFeature([Question, QuestionOption])],
  controllers: [QuestionsController, QuestionOptionsController],
  providers: [QuestionsService, QuestionOptionsService],
  exports: [QuestionsService, QuestionOptionsService],
})
export class QuestionsModule {}
