import { IsString, IsBoolean, IsOptional, IsEnum, IsNumber } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  text: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(['text', 'multiple-choice', 'checkbox', 'dropdown', 'file'])
  type: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsNumber()
  surveyId: number;
}
