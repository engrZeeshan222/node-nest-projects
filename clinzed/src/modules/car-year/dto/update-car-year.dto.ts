import { PartialType } from '@nestjs/swagger';
import { CreateCarYearDto } from './create-car-year.dto';

export class UpdateCarYearDto extends PartialType(CreateCarYearDto) {}
