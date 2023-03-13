import { ChargerPropertyService } from './charger-property.service';
import { CreateChargerPropertyDto } from './dto/create-charger-property.dto';
import { UpdateChargerPropertyDto } from './dto/update-charger-property.dto';
export declare class ChargerPropertyController {
    private readonly chargerPropertyService;
    constructor(chargerPropertyService: ChargerPropertyService);
    create(createChargerPropertyDto: CreateChargerPropertyDto, req: any): Promise<import("./entities/charger-property.entity").ChargerProperty>;
    update(id: string, updateChargerPropertyDto: UpdateChargerPropertyDto, req: any): Promise<import("./entities/charger-property.entity").ChargerProperty>;
    findAll(params: any, req: any): Promise<any>;
    findOne(id: string): Promise<import("./entities/charger-property.entity").ChargerProperty>;
    remove(id: string, req: any): Promise<import("./entities/charger-property.entity").ChargerProperty>;
}
