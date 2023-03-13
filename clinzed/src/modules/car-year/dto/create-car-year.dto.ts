import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CarModel } from 'src/modules/car-model/entities/car-model.entity';

export class CreateCarYearDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly year: string;
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly carModel: CarModel;
}
