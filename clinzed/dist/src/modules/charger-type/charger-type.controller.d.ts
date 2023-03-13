import { ChargerTypeService } from './charger-type.service';
import { CreateChargerTypeDto } from './dto/create-charger-type.dto';
import { UpdateChargerTypeDto } from './dto/update-charger-type.dto';
import { ChargerType } from './entities/charger-type.entity';
export declare class ChargerTypeController {
    private readonly chargerTypeService;
    constructor(chargerTypeService: ChargerTypeService);
    create(createChargerTypeDto: CreateChargerTypeDto): Promise<ChargerType>;
    findAll(params: any, req: any): Promise<ChargerType[]>;
    findOne(id: string): Promise<ChargerType>;
    update(id: string, updateChargerTypeDto: UpdateChargerTypeDto): Promise<ChargerType>;
    remove(id: string): Promise<ChargerType>;
}
