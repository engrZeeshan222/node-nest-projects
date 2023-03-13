import { Repository } from 'typeorm';
import { Query } from 'typeorm/driver/Query';
import { AddressService } from '../address/address.service';
import { ChargerPropertyService } from '../charger-property/charger-property.service';
import { InternalNoteService } from '../internal-note/internal-note.service';
import { User } from '../user/entities/user.entity';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Property } from './entities/property.entity';
export declare class PropertyService {
    private readonly addressService;
    private readonly internalNoteService;
    private readonly propertyRepository;
    private readonly chargerPropertyService;
    constructor(addressService: AddressService, internalNoteService: InternalNoteService, propertyRepository: Repository<Property>, chargerPropertyService: ChargerPropertyService);
    create(createPropertyDto: CreatePropertyDto, loginUser: User): Promise<Property>;
    findAll(queryParams: Query, user: User): Promise<any>;
    findOne(id: number): Promise<Property>;
    update(id: number, updatePropertyDto: UpdatePropertyDto, loginUser: User): Promise<Property>;
    pauseProperty(id: number, loginUser: User): Promise<Property>;
    remove(id: number, loginUser: User): Promise<Property>;
    average(zipCode: string): Promise<number>;
}
