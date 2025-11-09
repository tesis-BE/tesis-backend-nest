import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../base/api/base.service';
import { File } from '../entities/file.entity';
import { CreateFileDto } from '../dtos/create-file.dto';
import { UpdateFileDto } from '../dtos/update-file.dto';

@Injectable()
export class FileService extends BaseService<File, CreateFileDto, UpdateFileDto> {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {
    super(fileRepository);
  }
}
