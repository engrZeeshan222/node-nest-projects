import { Repository } from 'typeorm';
import { Query } from 'typeorm/driver/Query';
import { PayLoad } from '../auth/dto/payload.dto';
import { UsersService } from '../user/user.service';
import { CreateCustomerCarDto } from './dto/create-customer-car.dto';
import { UpdateCustomerCarDto } from './dto/update-customer-car.dto';
import { CustomerCar } from './entities/customer-car.entity';
export declare class CustomerCarService {
    private readonly customerCarRepository;
    private readonly usersService;
    constructor(customerCarRepository: Repository<CustomerCar>, usersService: UsersService);
    create(createCustomerCarDto: CreateCustomerCarDto, loginUser: PayLoad): Promise<CustomerCar>;
    findAll(queryParams: Query, user: PayLoad): Promise<CustomerCar[]>;
    findOne(id: number): Promise<CustomerCar>;
    update(id: number, updateCustomerCarDto: UpdateCustomerCarDto, loginUser: PayLoad): Promise<CustomerCar>;
    remove(id: number, loginUser: PayLoad): Promise<CustomerCar>;
}
