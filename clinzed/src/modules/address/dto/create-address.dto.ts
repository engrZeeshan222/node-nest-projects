import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly address: string;
  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly state: string;
  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly city: string;
  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly zip: string;
  @ApiProperty({ type: String })
  readonly messageBody?: string;
}
