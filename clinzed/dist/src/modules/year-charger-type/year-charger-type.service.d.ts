import { Repository } from 'typeorm';
import { CreateYearChargerTypeDto } from './dto/create-year-charger-type.dto';
import { YearChargerType } from './entities/year-charger-type.entity';
export declare class YearChargerTypeService {
    private readonly yearChargerTypeRepository;
    constructor(yearChargerTypeRepository: Repository<YearChargerType>);
    create(createYearChargerTypeDto: CreateYearChargerTypeDto): Promise<YearChargerType>;
    findAll(): Promise<YearChargerType[]>;
}
