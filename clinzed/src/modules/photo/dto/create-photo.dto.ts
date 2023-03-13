import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CarColor } from 'src/modules/car-color/entities/car-color.entity';
import { CustomerCar } from 'src/modules/customer-car/entities/customer-car.entity';
import { Property } from 'src/modules/property/entities/property.entity';

export class CreatePhotoDto {
  @ApiProperty({ type: String })
  photoKey?: string;
  @ApiProperty({ type: String })
  smallFilePath?: string;
  @ApiProperty({ type: String })
  mediumFilePath?: string;
  @ApiProperty({ type: String })
  largeFilePath?: string;

  @ApiProperty({ type: String })
  status?: string;
  @ApiProperty({ type: String })
  carColor?: CarColor;
  @ApiProperty({ type: String })
  property?: Property;
}
