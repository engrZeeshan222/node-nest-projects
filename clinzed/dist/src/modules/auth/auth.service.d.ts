import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { User } from '../user/entities/user.entity';
import { UsersService } from '../user/user.service';
import { PayLoad } from './dto/payload.dto';
import { SignUpUserDto } from './dto/signup.dto';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    private readonly mailService;
    constructor(userService: UsersService, jwtService: JwtService, mailService: MailService);
    validateUser(identifier: string, pass: string): Promise<{
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        phone: string;
        stripeAccountId: string;
        status: string;
        role: string;
        provider: string;
        googleId: string;
        facebookId: string;
        userSetting: import("../user-settings/entities/user-setting.entity").UserSetting;
        creditCard: import("../credit-card/entities/credit-card.entity").CreditCard[];
        customerCar: import("../customer-car/entities/customer-car.entity").CustomerCar[];
        Property: import("../property/entities/property.entity").Property[];
        hostMessage: import("../message-thread/entities/message-thread.entity").MessageThread[];
        customerMessage: import("../message-thread/entities/message-thread.entity").MessageThread[];
        userMessage: import("../messages/entities/message.entity").Message[];
        lastCustomerLogin: Date;
        lastHostLogin: Date;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(user: any, loginBody?: PayLoad): Promise<{
        user: any;
        token: string;
    }>;
    generateToken(user: User, isHost?: boolean): Promise<string>;
    create(signUpUserDto: SignUpUserDto): Promise<{
        user: {
            id: number;
            email: string;
            firstName: string;
            lastName: string;
            phone: string;
            stripeAccountId: string;
            status: string;
            role: string;
            provider: string;
            googleId: string;
            facebookId: string;
            userSetting: import("../user-settings/entities/user-setting.entity").UserSetting;
            creditCard: import("../credit-card/entities/credit-card.entity").CreditCard[];
            customerCar: import("../customer-car/entities/customer-car.entity").CustomerCar[];
            Property: import("../property/entities/property.entity").Property[];
            hostMessage: import("../message-thread/entities/message-thread.entity").MessageThread[];
            customerMessage: import("../message-thread/entities/message-thread.entity").MessageThread[];
            userMessage: import("../messages/entities/message.entity").Message[];
            lastCustomerLogin: Date;
            lastHostLogin: Date;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    facebook(access_token: any): Promise<any>;
    google(access_token: string): Promise<any>;
    verifyAccount(params: any): Promise<{
        user: User;
        token: string;
    }>;
    forgotPassword(email: string): Promise<any>;
    resetPassword(token: any, body: any): Promise<any>;
}
