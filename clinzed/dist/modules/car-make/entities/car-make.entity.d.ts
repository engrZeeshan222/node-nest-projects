import { CarModel } from 'src/modules/car-model/entities/car-model.entity';
export declare class CarMake {
    id: number;
    make: string;
    carModels: CarModel[];
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
