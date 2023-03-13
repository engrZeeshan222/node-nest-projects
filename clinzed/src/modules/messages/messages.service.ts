import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Query } from 'typeorm/driver/Query';
import { PayLoad } from '../auth/dto/payload.dto';
import { CreateMessageThreadDto } from '../message-thread/dto/create-message-thread.dto';
import { MessageThreadService } from '../message-thread/message-thread.service';
import { UsersService } from '../user/user.service';
import apiFeatures from '../utils/apiFeatures';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';
const relationsArray = [
  'sender',
  'messageThread',
  'messageThread.host',
  'messageThread.customer',
];
@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly messageThreadService: MessageThreadService,
    private readonly usersService: UsersService,
  ) {}
  async create(createMessageDto: CreateMessageDto, loginUser: PayLoad) {
    try {
      const user = await this.usersService.findOne(loginUser.id, loginUser);

      console.log(loginUser.isHost);
      let message;
      createMessageDto.sender = user;

      const createMessageThread: CreateMessageThreadDto = {
        message: createMessageDto.message,
        customer: null,
        host: null,
      };
      console.log('1', loginUser.isHost);

      if (loginUser.isHost) {
        createMessageThread.host = user;
        createMessageThread.customer = createMessageDto.receiver;
      } else {
        createMessageThread.customer = user;
        createMessageThread.host = createMessageDto.receiver;
      }
      const messageThread = await this.messageThreadService.create(
        createMessageThread,
        user,
      );
      message = this.messageRepository.create(createMessageDto);
      message.dateSent = new Date();
      message.messageThread = messageThread;
      message = await this.messageRepository.save(message);

      return message;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll(queryParams: Query, loginUser: PayLoad) {
    try {
      const user = await this.usersService.findOne(loginUser.id, loginUser);
      const messageThread = await this.messageThreadService.findAll(
        user,
        loginUser.isHost,
      );
      const allIdsOfMessageThread = [];
      messageThread.forEach((ele) => {
        allIdsOfMessageThread.push(ele.id);
      });
      console.log({ messageThread });
      // const messages = await this.messageRepository
      //   .createQueryBuilder('message')

      //   .select([
      //     'message',
      //     'messageThread',
      //     'messageThread.host',
      //     'messageThread.customer',
      //   ])
      //   .leftJoin('message.messageThread', 'messageThread')
      //   .where('message.messageThread IN (:...messageThread)', {
      //     messageThread: allIdsOfMessageThread,
      //   })

      //   .getMany();

      return messageThread;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: number) {
    try {
      const messageThread = await this.messageThreadService.findOne(id);
      console.log(messageThread);

      const messages = await this.messageRepository.find({
        where: {
          messageThread: {
            id: messageThread.id,
          },
        },
      });

      return messages;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async readAll(id: number, user: PayLoad) {
    try {
      const messageThread = await this.messageThreadService.findOne(id);

      if (
        user.id == messageThread.host.id ||
        user.id == messageThread.customer.id
      ) {
        await this.messageThreadService.readAll(messageThread.id, user);
      } else {
        throw new HttpException('not allowed', HttpStatus.FORBIDDEN);
      }
      return 'all marked as read';
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
