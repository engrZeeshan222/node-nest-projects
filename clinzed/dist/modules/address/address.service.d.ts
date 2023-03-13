import { Repository } from 'typeorm';
import { Query } from 'typeorm/driver/Query';
import { InternalNoteService } from '../internal-note/internal-note.service';
import { User } from '../user/entities/user.entity';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';
export declare class AddressService {
    private readonly internalNoteService;
    private readonly addressRepository;
    constructor(internalNoteService: InternalNoteService, addressRepository: Repository<Address>);
    create(createAddressDto: CreateAddressDto): Promise<Address>;
    findAll(queryParams: Query, user: User): Promise<any>;
    findOne(id: number): Promise<Address>;
    update(id: number, updateAddressDto: UpdateAddressDto): Promise<Address>;
}
