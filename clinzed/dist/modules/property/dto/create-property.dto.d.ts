import { Address } from 'src/modules/address/entities/address.entity';
import { ChargerProperty } from 'src/modules/charger-property/entities/charger-property.entity';
import { InternalNote } from 'src/modules/internal-note/entities/internal-note.entity';
export declare class CreatePropertyDto {
    readonly title: string;
    readonly description: string;
    readonly guestInstructions: string;
    readonly costPerMinute: number;
    readonly lengthInch: number;
    readonly heightInch: number;
    readonly widthInch: number;
    readonly carCount: number;
    address: Address;
    messageBody: string;
    chargers: ChargerProperty[];
    readonly internalNote: InternalNote;
}
