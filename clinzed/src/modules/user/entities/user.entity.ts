import { Role, UserStatus } from 'src/common/enum';
import { CreditCard } from 'src/modules/credit-card/entities/credit-card.entity';
import { CustomerCar } from 'src/modules/customer-car/entities/customer-car.entity';
import { MessageThread } from 'src/modules/message-thread/entities/message-thread.entity';
import { Message } from 'src/modules/messages/entities/message.entity';
import { Property } from 'src/modules/property/entities/property.entity';
import { UserSetting } from 'src/modules/user-settings/entities/user-setting.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,

  // BeforeInsert,
} from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  email: string;
  @Column({ select: false, nullable: true })
  password: string;
  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;
  @Column({ nullable: true })
  phone: string;
  @Column({ nullable: true })
  stripeAccountId: string;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.PENDING,
  })
  status: string;
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: string;
  @Column({ nullable: true })
  provider: string;
  @Column({ nullable: true })
  googleId: string;
  @Column({ nullable: true })
  facebookId: string;
  @OneToOne(() => UserSetting, (userSetting) => userSetting.user) // specify inverse side as a second parameter
  userSetting: UserSetting;

  @OneToMany(() => CreditCard, (creditCard) => creditCard.user, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  creditCard: CreditCard[];
  @OneToMany(() => CustomerCar, (customerCar) => customerCar.user, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  customerCar: CustomerCar[];
  @OneToMany(() => Property, (Property) => Property.host, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  Property: Property[];
  @OneToMany(() => MessageThread, (hostMessage) => hostMessage.host, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  hostMessage: MessageThread[];
  @OneToMany(
    () => MessageThread,
    (customerMessage) => customerMessage.customer,
    {
      onDelete: 'SET NULL',
      nullable: true,
    },
  )
  customerMessage: MessageThread[];
  @OneToMany(() => Message, (message) => message.sender, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  userMessage: Message[];
  @Column({
    type: 'timestamp',
    default: null,
  })
  lastCustomerLogin: Date;
  @Column({
    type: 'timestamp',
    default: null,
  })
  lastHostLogin: Date;
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
