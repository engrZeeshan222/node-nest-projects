import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ChargerType } from 'src/modules/charger-type/entities/charger-type.entity';
import { Property } from 'src/modules/property/entities/property.entity';

export class CreateChargerPropertyDto {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly property: Property;
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly chargerType: ChargerType;
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly quantity: number;
}
