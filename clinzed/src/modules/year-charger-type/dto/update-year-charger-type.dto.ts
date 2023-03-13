import { PartialType } from '@nestjs/swagger';
import { CreateYearChargerTypeDto } from './create-year-charger-type.dto';

export class UpdateYearChargerTypeDto extends PartialType(
  CreateYearChargerTypeDto,
) {}
