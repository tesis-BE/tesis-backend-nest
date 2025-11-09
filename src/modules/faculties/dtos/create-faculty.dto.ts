import { IsString, IsBoolean, IsOptional, IsNumber } from 'class-validator';

export class CreateFacultyDto {
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
  universityId: number;
}
