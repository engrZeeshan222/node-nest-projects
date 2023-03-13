import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Address } from 'src/modules/address/entities/address.entity';
import { ChargerProperty } from 'src/modules/charger-property/entities/charger-property.entity';
import { InternalNote } from 'src/modules/internal-note/entities/internal-note.entity';

export class CreatePropertyDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly title: string;
  @ApiProperty({ type: String })
  readonly description: string;
  @ApiProperty({ type: String })
  readonly guestInstructions: string;
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly costPerMinute: number;
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly lengthInch: number;
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly heightInch: number;
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly widthInch: number;
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly carCount: number;
  @ApiProperty({ type: String })
  @IsNotEmpty()
  public address: Address;
  @ApiProperty({ type: String })
  public messageBody: string;
  @ApiProperty({ type: String })
  public chargers: ChargerProperty[];
  @ApiProperty({ type: String })
  readonly internalNote: InternalNote;
}
