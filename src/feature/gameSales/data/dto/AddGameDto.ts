import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddGameDto {
  @IsString()
  @IsNotEmpty()
  consoleId: string;
  @IsNumber()
  @IsNotEmpty()
  gamesPlayed: number;

  @IsNumber()
  @IsNotEmpty()
  pricePerGame: number;

  @IsNumber()
  @IsNotEmpty()
  totalAmount: number;
  @IsString()
  @IsNotEmpty()
  paymentMethod: string;

  recordedBy: string;
}
