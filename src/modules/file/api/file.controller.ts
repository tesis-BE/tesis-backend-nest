import { Controller } from '@nestjs/common';
import { BaseController } from '../../base/api/base.controller';
import { File } from '../entities/file.entity';
import { CreateFileDto } from '../dtos/create-file.dto';
import { UpdateFileDto } from '../dtos/update-file.dto';
import { FileService } from './file.service';

@Controller('files')
export class FileController extends BaseController<
  File,
  CreateFileDto,
  UpdateFileDto
> {
  constructor(private readonly fileService: FileService) {
    super(fileService);
  }
}
