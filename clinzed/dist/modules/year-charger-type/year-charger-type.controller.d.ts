import { YearChargerTypeService } from './year-charger-type.service';
import { CreateYearChargerTypeDto } from './dto/create-year-charger-type.dto';
export declare class YearChargerTypeController {
    private readonly yearChargerTypeService;
    constructor(yearChargerTypeService: YearChargerTypeService);
    create(createYearChargerTypeDto: CreateYearChargerTypeDto): Promise<import("./entities/year-charger-type.entity").YearChargerType>;
    findAll(): Promise<import("./entities/year-charger-type.entity").YearChargerType[]>;
}
