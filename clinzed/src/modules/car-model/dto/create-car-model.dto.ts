import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CarMake } from 'src/modules/car-make/entities/car-make.entity';

export class CreateCarModelDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly model: string;
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly carMake: CarMake;
}
