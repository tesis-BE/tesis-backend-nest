import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../base/api/base.service';
import { Career } from '../entities/careers.entity';
import { CreateCareerDto } from '../dtos/create-career.dto';
import { UpdateCareerDto } from '../dtos/update-career.dto';

@Injectable()
export class CareersService extends BaseService<
  Career,
  CreateCareerDto,
  UpdateCareerDto
> {
  constructor(
    @InjectRepository(Career)
    private readonly careerRepository: Repository<Career>,
  ) {
    super(careerRepository);
  }
}
