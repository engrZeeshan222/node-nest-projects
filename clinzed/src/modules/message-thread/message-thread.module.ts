import { Module } from '@nestjs/common';
import { MessageThreadService } from './message-thread.service';
import { MessageThreadController } from './message-thread.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageThread } from './entities/message-thread.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MessageThread])],
  controllers: [MessageThreadController],
  providers: [MessageThreadService],
  exports: [MessageThreadService],
})
export class MessageThreadModule {}
