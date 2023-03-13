import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/modules/user/entities/user.entity';

export class CreateUserSettingDto {
  @ApiProperty({ type: Boolean })
  readonly isHostView: boolean;
  @ApiProperty({ type: Number })
  readonly user: User;
}
