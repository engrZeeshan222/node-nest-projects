import { User } from 'src/modules/user/entities/user.entity';
export declare class CreateMessageDto {
    message: string;
    receiver: User;
    sender: User;
}
