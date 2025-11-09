import { Controller } from '@nestjs/common';
import { BaseController } from '../../base/api/base.controller';
import { QuestionOption } from '../entities/question-option.entity';
import { CreateQuestionOptionDto } from '../dtos/create-question-option.dto';
import { UpdateQuestionOptionDto } from '../dtos/update-question-option.dto';
import { QuestionOptionsService } from './question-options.service';

@Controller('question-options')
export class QuestionOptionsController extends BaseController<
  QuestionOption,
  CreateQuestionOptionDto,
  UpdateQuestionOptionDto
> {
  constructor(private readonly questionOptionsService: QuestionOptionsService) {
    super(questionOptionsService);
  }
}
