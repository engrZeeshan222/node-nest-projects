import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CarModel } from 'src/modules/car-model/entities/car-model.entity';
import { Color } from 'src/modules/color/entities/color.entity';

export class CreateCarColorDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly color: Color;
  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly carModel: CarModel;
}
