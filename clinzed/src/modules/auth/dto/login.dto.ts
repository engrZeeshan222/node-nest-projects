import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ type: String })
  @IsEmail()
  @IsNotEmpty()
  readonly identifier: string;
  @ApiProperty({ type: Boolean })
  @IsNotEmpty()
  readonly isHost?: boolean;
  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly password: string;
}
