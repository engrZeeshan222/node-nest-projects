import { Repository } from 'typeorm';
import { Query } from 'typeorm/driver/Query';
import { PropertyService } from '../property/property.service';
import { User } from '../user/entities/user.entity';
import { CreateChargerPropertyDto } from './dto/create-charger-property.dto';
import { UpdateChargerPropertyDto } from './dto/update-charger-property.dto';
import { ChargerProperty } from './entities/charger-property.entity';
export declare class ChargerPropertyService {
    private readonly ChargerPropertyRepository;
    private readonly propertyService;
    constructor(ChargerPropertyRepository: Repository<ChargerProperty>, propertyService: PropertyService);
    create(createChargerPropertyDto: CreateChargerPropertyDto, user: User): Promise<ChargerProperty>;
    createMany(arrayOfChargers: any): Promise<import("typeorm").InsertResult>;
    findAll(queryParams: Query, user: User): Promise<any>;
    findOne(id: number): Promise<ChargerProperty>;
    update(id: number, updateChargerPropertyDto: UpdateChargerPropertyDto, user: User): Promise<ChargerProperty>;
    remove(id: number, user: User): Promise<ChargerProperty>;
}
