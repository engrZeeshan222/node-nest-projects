import { Repository } from 'typeorm';
import { Query } from 'typeorm/driver/Query';
import { User } from '../user/entities/user.entity';
import { CreateCarMakeDto } from './dto/create-car-make.dto';
import { CarMake } from './entities/car-make.entity';
export declare class CarMakeService {
    private readonly carMakeRepository;
    constructor(carMakeRepository: Repository<CarMake>);
    create(createCarMakeDto: CreateCarMakeDto): Promise<CarMake>;
    findAll(queryParams: Query, user: User): Promise<CarMake[]>;
    remove(id: number): Promise<CarMake>;
}
