import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Faculty } from './entities/faculties.entity';
import { CareersModule } from '../careers/careers.module';
import { FacultiesController } from './api/faculties.controller';
import { FacultiesService } from './api/faculties.service';

@Module({
  imports: [TypeOrmModule.forFeature([Faculty]), CareersModule],
  exports: [TypeOrmModule, FacultiesService],
  controllers: [FacultiesController],
  providers: [FacultiesService],
})
export class FacultiesModule {}
