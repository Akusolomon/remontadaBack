import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AddExpenseDto {
  @IsString()
  @IsNotEmpty()
  category: string;
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  note: string;

  recordedBy: string;
}
