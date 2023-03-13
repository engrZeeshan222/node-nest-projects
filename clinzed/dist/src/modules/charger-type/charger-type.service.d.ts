import { Repository } from 'typeorm';
import { Query } from 'typeorm/driver/Query';
import { User } from '../user/entities/user.entity';
import { CreateChargerTypeDto } from './dto/create-charger-type.dto';
import { UpdateChargerTypeDto } from './dto/update-charger-type.dto';
import { ChargerType } from './entities/charger-type.entity';
export declare class ChargerTypeService {
    private readonly chargerTypeRepository;
    constructor(chargerTypeRepository: Repository<ChargerType>);
    create(createChargerTypeDto: CreateChargerTypeDto): Promise<ChargerType>;
    findAll(queryParams: Query, user: User): Promise<ChargerType[]>;
    findOne(id: number): Promise<ChargerType>;
    update(id: number, updateChargerTypeDto: UpdateChargerTypeDto): Promise<ChargerType>;
    remove(id: number): Promise<ChargerType>;
}
