import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class SignUpUserDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
  @ApiProperty({ type: String })
  readonly firstName: string;
  @ApiProperty({ type: String })
  readonly lastName: string;
  @ApiProperty({ type: String })
  readonly password: string;
  @ApiProperty({ type: String })
  readonly confirmPassword: string;
  @ApiProperty({ type: String })
  @IsOptional()
  readonly role: string;
}
