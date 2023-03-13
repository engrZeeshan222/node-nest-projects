import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { User } from 'src/modules/user/entities/user.entity';

export class CreateCreditCardDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly title: string;
  @ApiProperty({ type: String })
  readonly type: string;
  @ApiProperty({ type: String })
  readonly lastFourDigits: string;
  @ApiProperty({ type: String })
  readonly expDate: string;
  @ApiProperty({ type: String })
  readonly zipCode: string;
  @ApiProperty({ type: String })
  readonly stripeCardId: string;
  @ApiProperty({ type: Boolean })
  isDefault: boolean;
  @ApiProperty({ type: String })
  readonly status: string;
  @ApiProperty({ type: String })
  readonly token?: string;
  @ApiProperty({ type: String })
  readonly user: User;
}
