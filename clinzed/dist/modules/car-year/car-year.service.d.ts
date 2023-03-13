import { Repository } from 'typeorm';
import { Query } from 'typeorm/driver/Query';
import { User } from '../user/entities/user.entity';
import { CreateCarYearDto } from './dto/create-car-year.dto';
import { CarYear } from './entities/car-year.entity';
export declare class CarYearService {
    private readonly carYearRepository;
    constructor(carYearRepository: Repository<CarYear>);
    create(createCarYearDto: CreateCarYearDto): Promise<CarYear>;
    findAll(queryParams: Query, user: User): Promise<CarYear[]>;
    remove(id: number): Promise<CarYear>;
}
