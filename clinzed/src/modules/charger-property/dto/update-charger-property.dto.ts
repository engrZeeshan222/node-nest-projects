import { PartialType } from '@nestjs/swagger';
import { CreateChargerPropertyDto } from './create-charger-property.dto';

export class UpdateChargerPropertyDto extends PartialType(
  CreateChargerPropertyDto,
) {}
