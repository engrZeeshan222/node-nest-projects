import { ChargerType } from 'src/modules/charger-type/entities/charger-type.entity';
import { Property } from 'src/modules/property/entities/property.entity';
export declare class CreateChargerPropertyDto {
    readonly property: Property;
    readonly chargerType: ChargerType;
    readonly quantity: number;
}
