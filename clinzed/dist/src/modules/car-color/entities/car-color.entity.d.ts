import { CarModel } from 'src/modules/car-model/entities/car-model.entity';
import { Color } from 'src/modules/color/entities/color.entity';
import { CustomerCar } from 'src/modules/customer-car/entities/customer-car.entity';
import { Photo } from 'src/modules/photo/entities/photo.entity';
export declare class CarColor {
    id: number;
    color: Color;
    carModel: CarModel;
    customerCars: CustomerCar[];
    photos: Photo[];
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
