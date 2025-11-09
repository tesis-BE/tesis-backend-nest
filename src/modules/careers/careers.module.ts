import { Module } from '@nestjs/common';
import { Career } from './entities/careers.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CareersController } from './api/careers.controller';
import { CareersService } from './api/careers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Career])],
  exports: [TypeOrmModule, CareersService],
  controllers: [CareersController],
  providers: [CareersService],
})
export class CareersModule {}
