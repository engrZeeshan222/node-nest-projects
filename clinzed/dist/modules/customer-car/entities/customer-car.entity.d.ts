import { CarColor } from 'src/modules/car-color/entities/car-color.entity';
import { CarModel } from 'src/modules/car-model/entities/car-model.entity';
import { CarYear } from 'src/modules/car-year/entities/car-year.entity';
import { User } from 'src/modules/user/entities/user.entity';
export declare class CustomerCar {
    id: number;
    title: string;
    licensePlate: string;
    status: string;
    user: User;
    carModel: CarModel;
    carColor: CarColor;
    carYear: CarYear;
    createdAt: Date;
    updatedAt: Date;
}
