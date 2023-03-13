import { Address } from 'src/modules/address/entities/address.entity';
import { Property } from 'src/modules/property/entities/property.entity';
export declare class InternalNote {
    id: number;
    messageBody: string;
    property: Property[];
    address: Address[];
    createdAt: Date;
    updatedAt: Date;
}
