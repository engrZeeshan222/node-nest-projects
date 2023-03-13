import { MessageThread } from 'src/modules/message-thread/entities/message-thread.entity';
import { User } from 'src/modules/user/entities/user.entity';
export declare class Message {
    id: number;
    message: string;
    sender: User;
    dateSent: Date;
    createdAt: Date;
    updatedAt: Date;
    messageThread: MessageThread;
}
