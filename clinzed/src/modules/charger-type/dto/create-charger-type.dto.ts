import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateChargerTypeDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly title: string;
}
