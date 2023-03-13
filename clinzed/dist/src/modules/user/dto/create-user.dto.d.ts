export declare class CreateUserDto {
    email: string;
    stripeAccountId?: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly password?: string;
    readonly googleId?: string;
    readonly facebookId?: string;
    readonly provider?: string;
    readonly status?: string;
    lastCustomerLogin?: Date;
    lastHostLogin?: Date;
}
