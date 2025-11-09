import { IsString, IsNotEmpty, IsIn, IsOptional } from 'class-validator';
import { ContactDetails } from '../entities/contact-details.entity'; // Asegúrate de importar tus entidades
import { CareerDetails } from '../entities/career-details.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsString()
  @IsNotEmpty()
  identification: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsIn(['candidato', 'empresa', 'admin'])
  rol: 'candidato' | 'empresa' | 'admin';

  // Puedes incluir validación para relaciones si se crean al mismo tiempo
  @IsOptional()
  contactDetails?: ContactDetails[];

  @IsOptional()
  careerDetails?: CareerDetails[];
}
