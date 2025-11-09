import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../base/api/base.service';
import { Faculty } from '../entities/faculties.entity';
import { CreateFacultyDto } from '../dtos/create-faculty.dto';
import { UpdateFacultyDto } from '../dtos/update-faculty.dto';

@Injectable()
export class FacultiesService extends BaseService<
  Faculty,
  CreateFacultyDto,
  UpdateFacultyDto
> {
  constructor(
    @InjectRepository(Faculty)
    private readonly facultyRepository: Repository<Faculty>,
  ) {
    super(facultyRepository);
  }
}
