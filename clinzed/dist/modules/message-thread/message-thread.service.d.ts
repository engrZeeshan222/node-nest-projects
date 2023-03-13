import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateMessageThreadDto } from './dto/create-message-thread.dto';
import { MessageThread } from './entities/message-thread.entity';
export declare class MessageThreadService {
    private readonly messageThreadRepository;
    constructor(messageThreadRepository: Repository<MessageThread>);
    create(createMessageThreadDto: CreateMessageThreadDto, user: any): Promise<MessageThread>;
    findAll(user: User, isHost: boolean): Promise<MessageThread[]>;
    findOne(id: number): Promise<MessageThread>;
    readAll(id: number, user: any): Promise<boolean>;
}
