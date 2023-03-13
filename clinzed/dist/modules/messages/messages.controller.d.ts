import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    create(createMessageDto: CreateMessageDto, req: any): Promise<any>;
    findAll(params: any, req: any): Promise<import("../message-thread/entities/message-thread.entity").MessageThread[]>;
    findOne(id: string): Promise<import("./entities/message.entity").Message[]>;
    ReadAllMessages(id: string, req: any): Promise<string>;
}
