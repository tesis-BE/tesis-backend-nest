import { Controller } from '@nestjs/common';
import { BaseController } from '../../base/api/base.controller';
import { Survey } from '../entities/suveys.entity';
import { CreateSurveyDto } from '../dtos/create-survey.dto';
import { UpdateSurveyDto } from '../dtos/update-survey.dto';
import { SurveysService } from './surveys.service';

@Controller('surveys')
export class SurveysController extends BaseController<
  Survey,
  CreateSurveyDto,
  UpdateSurveyDto
> {
  constructor(private readonly surveysService: SurveysService) {
    super(surveysService);
  }
}
