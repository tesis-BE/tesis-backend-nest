import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../base/api/base.service';
import { Answer } from '../entities/answers.entity';
import { CreateAnswerDto } from '../dtos/create-answer.dto';
import { UpdateAnswerDto } from '../dtos/update-answer.dto';

@Injectable()
export class AnswersService extends BaseService<
  Answer,
  CreateAnswerDto,
  UpdateAnswerDto
> {
  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
  ) {
    super(answerRepository);
  }
}
