import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../base/api/base.service';
import { Survey } from '../entities/suveys.entity';
import { CreateSurveyDto } from '../dtos/create-survey.dto';
import { UpdateSurveyDto } from '../dtos/update-survey.dto';

@Injectable()
export class SurveysService extends BaseService<
  Survey,
  CreateSurveyDto,
  UpdateSurveyDto
> {
  constructor(
    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,
  ) {
    super(surveyRepository);
  }
}
