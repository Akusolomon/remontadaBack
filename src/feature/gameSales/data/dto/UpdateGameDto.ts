import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateGameDto {
  @IsString()
  @IsOptional()
  consoleId: string;
  @IsNumber()
  @IsOptional()
  gamesPlayed: number;

  @IsNumber()
  @IsOptional()
  pricePerGame: number;

  totalAmount: number;
  @IsString()
  @IsOptional()
  paymentMethod: string;
  
  
  recordedBy: string;
}
