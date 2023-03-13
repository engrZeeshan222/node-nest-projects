import { CarColor } from 'src/modules/car-color/entities/car-color.entity';
import { CarMake } from 'src/modules/car-make/entities/car-make.entity';
import { CarYear } from 'src/modules/car-year/entities/car-year.entity';
import { CustomerCar } from 'src/modules/customer-car/entities/customer-car.entity';
export declare class CarModel {
    id: number;
    model: string;
    status: string;
    carMake: CarMake;
    carYears: CarYear[];
    carColors: CarColor[];
    customerCars: CustomerCar[];
    createdAt: Date;
    updatedAt: Date;
}
