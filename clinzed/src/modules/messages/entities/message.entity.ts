import { boolean } from 'joi';
import { MessageThread } from 'src/modules/message-thread/entities/message-thread.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: String, nullable: false })
  message: string;
  @ManyToOne(() => User, (user) => user.userMessage, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  sender: User;
  @Column({
    type: 'timestamp',
    default: null,
  })
  dateSent: Date;
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
  @ManyToOne(() => MessageThread, (messageThread) => messageThread.messages, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  messageThread: MessageThread;
}
