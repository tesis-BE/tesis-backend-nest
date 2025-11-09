import { Controller } from '@nestjs/common';
import { BaseController } from '../../base/api/base.controller';
import { Answer } from '../entities/answers.entity';
import { CreateAnswerDto } from '../dtos/create-answer.dto';
import { UpdateAnswerDto } from '../dtos/update-answer.dto';
import { AnswersService } from './answers.service';

@Controller('answers')
export class AnswersController extends BaseController<
  Answer,
  CreateAnswerDto,
  UpdateAnswerDto
> {
  constructor(private readonly answersService: AnswersService) {
    super(answersService);
  }
}
