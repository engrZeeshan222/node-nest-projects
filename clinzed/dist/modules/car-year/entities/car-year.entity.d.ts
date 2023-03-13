import { CarModel } from 'src/modules/car-model/entities/car-model.entity';
import { CustomerCar } from 'src/modules/customer-car/entities/customer-car.entity';
import { YearChargerType } from 'src/modules/year-charger-type/entities/year-charger-type.entity';
export declare class CarYear {
    id: number;
    year: string;
    carModel: CarModel;
    customerCars: CustomerCar[];
    yearChargerTypes: YearChargerType[];
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
