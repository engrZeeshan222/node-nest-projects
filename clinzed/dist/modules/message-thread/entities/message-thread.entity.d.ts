import { Message } from 'src/modules/messages/entities/message.entity';
import { User } from 'src/modules/user/entities/user.entity';
export declare class MessageThread {
    id: number;
    message: string;
    isReadCustomer: boolean;
    isReadHost: boolean;
    host: User;
    customer: User;
    messages: Message[];
    dateSent: Date;
    customerUnreadCount: number;
    hostUnreadCount: number;
    createdAt: Date;
    updatedAt: Date;
}
