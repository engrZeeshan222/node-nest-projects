import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Query } from 'typeorm/driver/Query';
import { User } from '../user/entities/user.entity';
import { CreateMessageThreadDto } from './dto/create-message-thread.dto';
import { UpdateMessageThreadDto } from './dto/update-message-thread.dto';
import { MessageThread } from './entities/message-thread.entity';
const relationsArray = ['host', 'customer'];
@Injectable()
export class MessageThreadService {
  constructor(
    @InjectRepository(MessageThread)
    private readonly messageThreadRepository: Repository<MessageThread>,
  ) {}
  async create(createMessageThreadDto: CreateMessageThreadDto, user: any) {
    try {
      let messageThread = await this.messageThreadRepository.findOne({
        where: {
          host: {
            id: createMessageThreadDto.host.id,
          },
          customer: {
            id: createMessageThreadDto.customer.id,
          },
        },
      });
      if (messageThread) {
        messageThread.dateSent = new Date();
        messageThread.message = createMessageThreadDto.message;
        if (user.isHost && messageThread.hostUnreadCount >= 0) {
          messageThread.hostUnreadCount = ++messageThread.hostUnreadCount;
        }
        if (!user.isHost && messageThread.customerUnreadCount >= 0) {
          messageThread.customerUnreadCount =
            ++messageThread.customerUnreadCount;
        } else {
          if (user.isHost) {
            messageThread.hostUnreadCount = 1;
          } else {
            messageThread.customerUnreadCount = 1;
          }
        }

        messageThread = await this.messageThreadRepository.save({
          ...messageThread,
        });
      } else {
        messageThread = await this.messageThreadRepository.create(
          createMessageThreadDto,
        );
        messageThread.dateSent = new Date();
        if (user.ishost) {
          messageThread.hostUnreadCount = 1;
        } else {
          messageThread.customerUnreadCount = 1;
        }
        messageThread = await this.messageThreadRepository.save({
          ...messageThread,
        });
      }
      return messageThread;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll(user: User, isHost: boolean) {
    try {
      if (isHost) {
        console.log(user);

        const messageThreads = await this.messageThreadRepository.find({
          where: {
            host: {
              id: user.id,
            },
          },
          relations: relationsArray,
        });
        console.log({ messageThreads });

        return messageThreads;
      } else {
        const messageThreads = await this.messageThreadRepository.find({
          where: {
            customer: user,
          },
          relations: relationsArray,
        });
        return messageThreads;
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: number) {
    try {
      return await this.messageThreadRepository.findOne({
        where: { id },
        relations: relationsArray,
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  async readAll(id: number, user: any) {
    try {
      const messageThread = await this.messageThreadRepository.findOne({
        where: { id },
        relations: relationsArray,
      });
      if (user.host) {
        messageThread.hostUnreadCount = 0;
        messageThread.isReadHost = true;
        await this.messageThreadRepository.save({ ...messageThread });
      } else {
        messageThread.customerUnreadCount = 0;
        messageThread.isReadCustomer = true;
        await this.messageThreadRepository.save({ ...messageThread });
      }
      return true;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
