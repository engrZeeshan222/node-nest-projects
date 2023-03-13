import { CarMakeService } from './car-make.service';
import { CreateCarMakeDto } from './dto/create-car-make.dto';
import { CarMake } from './entities/car-make.entity';
export declare class CarMakeController {
    private readonly carMakeService;
    constructor(carMakeService: CarMakeService);
    create(createCarMakeDto: CreateCarMakeDto): Promise<CarMake>;
    findAll(params: any, req: any): Promise<CarMake[]>;
    remove(id: string): Promise<CarMake>;
}
