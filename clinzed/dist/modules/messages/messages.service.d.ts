import { Repository } from 'typeorm';
import { Query } from 'typeorm/driver/Query';
import { PayLoad } from '../auth/dto/payload.dto';
import { MessageThreadService } from '../message-thread/message-thread.service';
import { UsersService } from '../user/user.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';
export declare class MessagesService {
    private readonly messageRepository;
    private readonly messageThreadService;
    private readonly usersService;
    constructor(messageRepository: Repository<Message>, messageThreadService: MessageThreadService, usersService: UsersService);
    create(createMessageDto: CreateMessageDto, loginUser: PayLoad): Promise<any>;
    findAll(queryParams: Query, loginUser: PayLoad): Promise<import("../message-thread/entities/message-thread.entity").MessageThread[]>;
    findOne(id: number): Promise<Message[]>;
    readAll(id: number, user: PayLoad): Promise<string>;
}
