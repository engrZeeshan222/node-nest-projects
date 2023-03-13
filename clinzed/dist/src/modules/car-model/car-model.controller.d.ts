import { CarModelService } from './car-model.service';
import { CreateCarModelDto } from './dto/create-car-model.dto';
import { CarModel } from './entities/car-model.entity';
export declare class CarModelController {
    private readonly carModelService;
    constructor(carModelService: CarModelService);
    create(createCarModelDto: CreateCarModelDto): Promise<CarModel>;
    findAll(params: any, req: any): Promise<CarModel[]>;
    remove(id: string): Promise<CarModel>;
}
