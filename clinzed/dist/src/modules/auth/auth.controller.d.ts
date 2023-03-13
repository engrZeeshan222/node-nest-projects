import { AuthService } from './auth.service';
import { SignUpUserDto } from './dto/signup.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        user: any;
        token: string;
    }>;
    signUp(signUpUser: SignUpUserDto): Promise<{
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
    googleLogin(access_token: string): Promise<any>;
    faceBookLogin(access_token: string): Promise<any>;
    verifyAccount(params: any): Promise<{
        user: import("../user/entities/user.entity").User;
        token: string;
    }>;
    forgotPassword(email: any): Promise<any>;
    resetPassword(token: any, body: any): Promise<any>;
}
