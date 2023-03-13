import { PartialType } from '@nestjs/swagger';
import { CreateCarMakeDto } from './create-car-make.dto';

export class UpdateCarMakeDto extends PartialType(CreateCarMakeDto) {}
