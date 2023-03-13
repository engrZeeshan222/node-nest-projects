import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UserSetting {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: Boolean, default: false })
  isHostView: boolean;
  @OneToOne(() => User, (user) => user.userSetting) // specify inverse side as a second parameter
  @JoinColumn()
  user: User;
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
