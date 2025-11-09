import { Module } from '@nestjs/common';
import { University } from './entities/universities.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UniversitiesController } from './api/universities.controller';
import { UniversitiesService } from './api/universities.service';

@Module({
  imports: [TypeOrmModule.forFeature([University])],
  exports: [TypeOrmModule, UniversitiesService],
  controllers: [UniversitiesController],
  providers: [UniversitiesService],
})
export class UniversitiesModule {}
