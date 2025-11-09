import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateFileDto {
  @IsString()
  filename: string;

  @IsString()
  url: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
