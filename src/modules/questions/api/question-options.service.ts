import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../base/api/base.service';
import { QuestionOption } from '../entities/question-option.entity';
import { CreateQuestionOptionDto } from '../dtos/create-question-option.dto';
import { UpdateQuestionOptionDto } from '../dtos/update-question-option.dto';

@Injectable()
export class QuestionOptionsService extends BaseService<
  QuestionOption,
  CreateQuestionOptionDto,
  UpdateQuestionOptionDto
> {
  constructor(
    @InjectRepository(QuestionOption)
    private readonly questionOptionRepository: Repository<QuestionOption>,
  ) {
    super(questionOptionRepository);
  }
}
