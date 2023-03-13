import { Repository } from 'typeorm';
import { Query } from 'typeorm/driver/Query';
import { User } from '../user/entities/user.entity';
import { CreateCarModelDto } from './dto/create-car-model.dto';
import { CarModel } from './entities/car-model.entity';
export declare class CarModelService {
    private readonly carModelRepository;
    constructor(carModelRepository: Repository<CarModel>);
    create(createCarModelDto: CreateCarModelDto): Promise<CarModel>;
    findAll(queryParams: Query, user: User): Promise<CarModel[]>;
    remove(id: number): Promise<CarModel>;
}
