import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './api/users.service';
import { UsersController } from './api/users.controller';
import { User } from './entities/user.entity';
// Importa otras entidades si este módulo las gestiona
import { ContactDetails } from './entities/contact-details.entity';
import { CareerDetails } from './entities/career-details.entity';

@Module({
  imports: [
    // Importante: Registra las entidades que este módulo usará
    TypeOrmModule.forFeature([User, ContactDetails, CareerDetails]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
