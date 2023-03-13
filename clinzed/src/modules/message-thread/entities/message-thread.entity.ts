import { Message } from 'src/modules/messages/entities/message.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class MessageThread {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: String, nullable: false })
  message: string;
  @Column({ type: Boolean, default: false })
  isReadCustomer: boolean;
  @Column({ type: Boolean, default: false })
  isReadHost: boolean;
  @ManyToOne(() => User, (user) => user.hostMessage, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  host: User;
  @ManyToOne(() => User, (user) => user.customerMessage, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  customer: User;
  @OneToMany(() => Message, (Message) => Message.message, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  messages: Message[];
  @Column({
    type: 'timestamp',
    default: null,
  })
  dateSent: Date;
  @Column({
    type: Number,
    default: null,
  })
  customerUnreadCount: number;
  @Column({
    type: Number,
    default: null,
  })
  hostUnreadCount: number;
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
