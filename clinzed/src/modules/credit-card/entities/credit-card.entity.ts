import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { CARD_STATUS, CARD_TYPE } from 'src/common/enum';

@Entity()
export class CreditCard {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: String, nullable: false })
  title: string;
  @Column({
    type: 'enum',
    enum: CARD_TYPE,
    default: CARD_TYPE.DEBIT,
  })
  type: string;
  @Column({
    type: 'enum',
    enum: CARD_STATUS,
    default: CARD_STATUS.ACTIVE,
  })
  status: string;
  @Column({ type: String, nullable: true })
  lastFourDigits: string;
  @Column({ type: String, nullable: true })
  expDate: string;
  @Column({ type: String, nullable: true })
  zipCode: string;
  @Column({ type: String, nullable: true })
  stripeCardId: string;
  @Column({
    type: Boolean,
    default: false,
  })
  isDefault: boolean;

  @ManyToOne(() => User, (user) => user.creditCard, {
    onDelete: 'SET NULL',
    nullable: true,
  })
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
