import { Controller } from '@nestjs/common';
import { BaseController } from '../../base/api/base.controller';
import { Faculty } from '../entities/faculties.entity';
import { CreateFacultyDto } from '../dtos/create-faculty.dto';
import { UpdateFacultyDto } from '../dtos/update-faculty.dto';
import { FacultiesService } from './faculties.service';

@Controller('faculties')
export class FacultiesController extends BaseController<
  Faculty,
  CreateFacultyDto,
  UpdateFacultyDto
> {
  constructor(private readonly facultiesService: FacultiesService) {
    super(facultiesService);
  }
}
