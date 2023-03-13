import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CarColor } from 'src/modules/car-color/entities/car-color.entity';
import { CarModel } from 'src/modules/car-model/entities/car-model.entity';
import { CarYear } from 'src/modules/car-year/entities/car-year.entity';
import { User } from 'src/modules/user/entities/user.entity';

export class CreateCustomerCarDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly title: string;
  @ApiProperty({ type: String })
  readonly licensePlate: string;
  @ApiProperty({ type: String })
  readonly status?: string;
  @ApiProperty({ type: Number })
  readonly user: User;
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly carModel: CarModel;
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly carColor: CarColor;
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly carYear: CarYear;
}
