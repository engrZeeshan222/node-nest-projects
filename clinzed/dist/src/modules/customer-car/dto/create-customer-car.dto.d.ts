import { CarColor } from 'src/modules/car-color/entities/car-color.entity';
import { CarModel } from 'src/modules/car-model/entities/car-model.entity';
import { CarYear } from 'src/modules/car-year/entities/car-year.entity';
import { User } from 'src/modules/user/entities/user.entity';
export declare class CreateCustomerCarDto {
    readonly title: string;
    readonly licensePlate: string;
    readonly status?: string;
    readonly user: User;
    readonly carModel: CarModel;
    readonly carColor: CarColor;
    readonly carYear: CarYear;
}
