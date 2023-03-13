import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCarMakeDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly make: string;
}
