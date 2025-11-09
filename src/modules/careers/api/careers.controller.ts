import { Controller } from '@nestjs/common';
import { BaseController } from '../../base/api/base.controller';
import { Career } from '../entities/careers.entity';
import { CreateCareerDto } from '../dtos/create-career.dto';
import { UpdateCareerDto } from '../dtos/update-career.dto';
import { CareersService } from './careers.service';

@Controller('careers')
export class CareersController extends BaseController<
  Career,
  CreateCareerDto,
  UpdateCareerDto
> {
  constructor(private readonly careersService: CareersService) {
    super(careersService);
  }
}
