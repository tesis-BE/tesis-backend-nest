import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../base/api/base.service';
import { University } from '../entities/universities.entity';
import { CreateUniversityDto } from '../dtos/create-university.dto';
import { UpdateUniversityDto } from '../dtos/update-university.dto';

@Injectable()
export class UniversitiesService extends BaseService<
  University,
  CreateUniversityDto,
  UpdateUniversityDto
> {
  constructor(
    @InjectRepository(University)
    private readonly universityRepository: Repository<University>,
  ) {
    super(universityRepository);
  }
}
