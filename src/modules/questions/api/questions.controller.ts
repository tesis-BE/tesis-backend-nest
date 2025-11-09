import { Controller } from '@nestjs/common';
import { BaseController } from '../../base/api/base.controller';
import { Question } from '../entities/questions.entities';
import { CreateQuestionDto } from '../dtos/create-question.dto';
import { UpdateQuestionDto } from '../dtos/update-question.dto';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController extends BaseController<
  Question,
  CreateQuestionDto,
  UpdateQuestionDto
> {
  constructor(private readonly questionsService: QuestionsService) {
    super(questionsService);
  }
}
