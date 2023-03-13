import { CustomerCarService } from './customer-car.service';
import { CreateCustomerCarDto } from './dto/create-customer-car.dto';
import { UpdateCustomerCarDto } from './dto/update-customer-car.dto';
export declare class CustomerCarController {
    private readonly customerCarService;
    constructor(customerCarService: CustomerCarService);
    create(createCustomerCarDto: CreateCustomerCarDto, req: any): Promise<import("./entities/customer-car.entity").CustomerCar>;
    findAll(params: any, req: any): Promise<import("./entities/customer-car.entity").CustomerCar[]>;
    findOne(id: string): Promise<import("./entities/customer-car.entity").CustomerCar>;
    update(id: string, updateCustomerCarDto: UpdateCustomerCarDto, req: any): Promise<import("./entities/customer-car.entity").CustomerCar>;
    remove(id: string, req: any): Promise<import("./entities/customer-car.entity").CustomerCar>;
}
