import { IsString, IsOptional, IsNumber, IsArray } from 'class-validator';

export class CreateAnswerDto {
  @IsOptional()
  @IsString()
  value?: string;

  @IsNumber()
  userId: number;

  @IsNumber()
  questionId: number;

  @IsOptional()
  @IsNumber()
  fileId?: number;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  selectedOptionIds?: number[];
}
