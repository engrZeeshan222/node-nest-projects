import { InternalNote } from 'src/modules/internal-note/entities/internal-note.entity';
import { Property } from 'src/modules/property/entities/property.entity';
export declare class Address {
    id: number;
    address: string;
    city: string;
    state: string;
    zip: string;
    internalNote: InternalNote;
    property: Property[];
    createdAt: Date;
    updatedAt: Date;
}
