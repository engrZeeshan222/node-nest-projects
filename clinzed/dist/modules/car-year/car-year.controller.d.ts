import { CarYearService } from './car-year.service';
import { CreateCarYearDto } from './dto/create-car-year.dto';
import { CarYear } from './entities/car-year.entity';
export declare class CarYearController {
    private readonly carYearService;
    constructor(carYearService: CarYearService);
    create(createCarYearDto: CreateCarYearDto): Promise<CarYear>;
    findAll(params: any, req: any): Promise<CarYear[]>;
    remove(id: string): Promise<CarYear>;
}
