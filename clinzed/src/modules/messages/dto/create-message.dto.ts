import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { User } from 'src/modules/user/entities/user.entity';

export class CreateMessageDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  message: string;
  @ApiProperty({ type: String })
  @IsNotEmpty()
  receiver: User;
  @ApiProperty({ type: String })
  @IsNotEmpty()
  sender: User;
}
