import { CarColorService } from './car-color.service';
import { CreateCarColorDto } from './dto/create-car-color.dto';
import { CarColor } from './entities/car-color.entity';
export declare class CarColorController {
    private readonly carColorService;
    constructor(carColorService: CarColorService);
    create(createCarColorDto: CreateCarColorDto): Promise<CarColor>;
    findAll(params: any, req: any): Promise<CarColor[]>;
    remove(id: string): Promise<CarColor>;
}
