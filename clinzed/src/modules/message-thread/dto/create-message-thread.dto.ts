import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/modules/user/entities/user.entity';

export class CreateMessageThreadDto {
  @ApiProperty({ type: String })
  message: string;
  @ApiProperty({ type: Number })
  host: User;
  @ApiProperty({ type: Number })
  customer: User;
}
