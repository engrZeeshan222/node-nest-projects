import { PartialType } from '@nestjs/swagger';
import { CreateChargerTypeDto } from './create-charger-type.dto';

export class UpdateChargerTypeDto extends PartialType(CreateChargerTypeDto) {}
