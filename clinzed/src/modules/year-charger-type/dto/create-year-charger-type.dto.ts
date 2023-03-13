import { ApiProperty } from '@nestjs/swagger';
import { CarYear } from 'src/modules/car-year/entities/car-year.entity';
import { ChargerType } from 'src/modules/charger-type/entities/charger-type.entity';

export class CreateYearChargerTypeDto {
  @ApiProperty({ type: Number })
  readonly carYear: CarYear;
  @ApiProperty({ type: Number })
  readonly chargerType: ChargerType;
}
