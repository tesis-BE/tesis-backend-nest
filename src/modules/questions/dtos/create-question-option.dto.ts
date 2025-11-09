import { IsString, IsNumber } from 'class-validator';

export class CreateQuestionOptionDto {
  @IsString()
  value: string;

  @IsNumber()
  questionId: number;
}
