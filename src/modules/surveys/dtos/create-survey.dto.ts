import { IsString, IsBoolean, IsOptional, IsNumber } from 'class-validator';

export class CreateSurveyDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsNumber()
  createdById: number;

  @IsOptional()
  @IsNumber()
  updatedById?: number;
}
