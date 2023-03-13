import { CreditCardService } from './credit-card.service';
import { CreateCreditCardDto } from './dto/create-credit-card.dto';
export declare class CreditCardController {
    private readonly creditCardService;
    constructor(creditCardService: CreditCardService);
    create(createCreditCardDto: CreateCreditCardDto, req: any): Promise<import("./entities/credit-card.entity").CreditCard>;
    findAll(params: any, req: any): Promise<import("./entities/credit-card.entity").CreditCard[]>;
    findOne(id: string): Promise<import("./entities/credit-card.entity").CreditCard>;
    defaultCard(id: string, req: any): Promise<import("./entities/credit-card.entity").CreditCard>;
    remove(id: string, req: any): Promise<import("./entities/credit-card.entity").CreditCard>;
}
