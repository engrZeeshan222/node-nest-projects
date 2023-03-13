import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty({ type: String })
  stripeAccountId?: string;
  @ApiProperty({ type: String })
  readonly firstName: string;
  @ApiProperty({ type: String })
  readonly lastName: string;
  @ApiProperty({ type: String })
  @IsOptional()
  readonly password?: string;
  readonly googleId?: string;
  readonly facebookId?: string;
  readonly provider?: string;
  readonly status?: string;
  lastCustomerLogin?: Date;
  lastHostLogin?: Date;
}
