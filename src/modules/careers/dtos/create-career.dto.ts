import { IsString, IsBoolean, IsOptional, IsNumber } from 'class-validator';

export class CreateCareerDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsNumber()
  facultyId: number;
}
