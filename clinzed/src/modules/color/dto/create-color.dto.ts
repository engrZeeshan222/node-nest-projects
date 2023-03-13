import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateColorDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly color: string;
}
