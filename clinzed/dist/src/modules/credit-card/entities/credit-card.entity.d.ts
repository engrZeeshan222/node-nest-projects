import { User } from 'src/modules/user/entities/user.entity';
export declare class CreditCard {
    id: number;
    title: string;
    type: string;
    status: string;
    lastFourDigits: string;
    expDate: string;
    zipCode: string;
    stripeCardId: string;
    isDefault: boolean;
    user: User;
    createdAt: Date;
    updatedAt: Date;
}
