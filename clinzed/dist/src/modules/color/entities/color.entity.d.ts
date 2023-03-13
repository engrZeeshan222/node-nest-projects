import { CarColor } from 'src/modules/car-color/entities/car-color.entity';
export declare class Color {
    id: number;
    color: string;
    carColors: CarColor[];
    createdAt: Date;
    updatedAt: Date;
}
