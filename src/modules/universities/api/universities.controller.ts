import { Controller } from '@nestjs/common';
import { BaseController } from '../../base/api/base.controller';
import { University } from '../entities/universities.entity';
import { CreateUniversityDto } from '../dtos/create-university.dto';
import { UpdateUniversityDto } from '../dtos/update-university.dto';
import { UniversitiesService } from './universities.service';

@Controller('universities')
export class UniversitiesController extends BaseController<
  University,
  CreateUniversityDto,
  UpdateUniversityDto
> {
  constructor(private readonly universitiesService: UniversitiesService) {
    super(universitiesService);
  }
}
