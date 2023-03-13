import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../user/entities/user.entity';
export declare class MailService {
    private mailerService;
    constructor(mailerService: MailerService);
    sendUserConfirmation(user: User, token: string): Promise<void>;
    resetPassword(user: User, token: string): Promise<void>;
}
