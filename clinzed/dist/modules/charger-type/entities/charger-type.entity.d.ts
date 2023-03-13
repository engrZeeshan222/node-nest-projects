import { ChargerProperty } from 'src/modules/charger-property/entities/charger-property.entity';
import { YearChargerType } from 'src/modules/year-charger-type/entities/year-charger-type.entity';
export declare class ChargerType {
    id: number;
    title: string;
    yearChargerTypes: YearChargerType[];
    chargerProperty: ChargerProperty[];
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
