import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { MessageThreadModule } from '../message-thread/message-thread.module';
import { UsersModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message]),
    MessageThreadModule,
    UsersModule,
  ],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
