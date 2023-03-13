import { Repository } from 'typeorm';
import { Query } from 'typeorm/driver/Query';
import { User } from '../user/entities/user.entity';
import { CreateCarColorDto } from './dto/create-car-color.dto';
import { CarColor } from './entities/car-color.entity';
export declare class CarColorService {
    private readonly carColorRepository;
    constructor(carColorRepository: Repository<CarColor>);
    create(createCarColorDto: CreateCarColorDto): Promise<CarColor>;
    findAll(queryParams: Query, user: User): Promise<CarColor[]>;
    remove(id: number): Promise<CarColor>;
}
