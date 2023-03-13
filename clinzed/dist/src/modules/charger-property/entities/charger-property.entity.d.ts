import { ChargerType } from 'src/modules/charger-type/entities/charger-type.entity';
import { Property } from 'src/modules/property/entities/property.entity';
export declare class ChargerProperty {
    id: number;
    chargerType: ChargerType;
    property: Property;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
}
