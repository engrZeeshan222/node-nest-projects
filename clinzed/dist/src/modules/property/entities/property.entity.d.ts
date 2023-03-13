import { Address } from 'src/modules/address/entities/address.entity';
import { ChargerProperty } from 'src/modules/charger-property/entities/charger-property.entity';
import { InternalNote } from 'src/modules/internal-note/entities/internal-note.entity';
import { Photo } from 'src/modules/photo/entities/photo.entity';
import { User } from 'src/modules/user/entities/user.entity';
export declare class Property {
    id: number;
    title: string;
    description: string;
    guestInstructions: string;
    costPerMinute: number;
    lengthInch: number;
    heightInch: number;
    widthInch: number;
    carCount: number;
    chargerProperty: ChargerProperty[];
    status: string;
    photos: Photo[];
    internalNote: InternalNote;
    address: Address;
    host: User;
    createdAt: Date;
    updatedAt: Date;
}
