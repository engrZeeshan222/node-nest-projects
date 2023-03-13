import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
export declare class AddressController {
    private readonly addressService;
    constructor(addressService: AddressService);
    create(createAddressDto: CreateAddressDto): Promise<import("./entities/address.entity").Address>;
    findAll(params: any, req: any): Promise<any>;
    findOne(id: string): Promise<import("./entities/address.entity").Address>;
    update(id: string, updateAddressDto: UpdateAddressDto): Promise<import("./entities/address.entity").Address>;
}
