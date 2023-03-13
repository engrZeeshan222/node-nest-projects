import { User } from 'src/modules/user/entities/user.entity';
export declare class CreateCreditCardDto {
    readonly title: string;
    readonly type: string;
    readonly lastFourDigits: string;
    readonly expDate: string;
    readonly zipCode: string;
    readonly stripeCardId: string;
    isDefault: boolean;
    readonly status: string;
    readonly token?: string;
    readonly user: User;
}
