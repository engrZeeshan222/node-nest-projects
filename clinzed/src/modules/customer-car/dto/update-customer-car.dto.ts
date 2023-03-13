import { PartialType } from '@nestjs/swagger';
import { CreateCustomerCarDto } from './create-customer-car.dto';

export class UpdateCustomerCarDto extends PartialType(CreateCustomerCarDto) {}
