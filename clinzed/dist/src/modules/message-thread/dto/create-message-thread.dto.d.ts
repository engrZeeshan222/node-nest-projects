import { User } from 'src/modules/user/entities/user.entity';
export declare class CreateMessageThreadDto {
    message: string;
    host: User;
    customer: User;
}
