import { CarYear } from 'src/modules/car-year/entities/car-year.entity';
import { ChargerType } from 'src/modules/charger-type/entities/charger-type.entity';
export declare class YearChargerType {
    id: number;
    carYear: CarYear;
    chargerType: ChargerType;
    createdAt: Date;
    updatedAt: Date;
}
