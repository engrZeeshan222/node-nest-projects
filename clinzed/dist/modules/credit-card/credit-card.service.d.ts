import Stripe from 'stripe';
import { Repository } from 'typeorm';
import { Query } from 'typeorm/driver/Query';
import { User } from '../user/entities/user.entity';
import { CreateCreditCardDto } from './dto/create-credit-card.dto';
import { CreditCard } from './entities/credit-card.entity';
export declare class CreditCardService {
    private readonly creditCardRepository;
    private readonly stripeClient;
    constructor(creditCardRepository: Repository<CreditCard>, stripeClient: Stripe);
    create(createCreditCardDto: CreateCreditCardDto, loginUser: User): Promise<CreditCard>;
    findAll(queryParams: Query, user: User): Promise<CreditCard[]>;
    findOne(id: number): Promise<CreditCard>;
    defaultCard(id: number, loginUser: User): Promise<CreditCard>;
    remove(id: number, loginUser: User): Promise<CreditCard>;
}
