import { CarColor } from 'src/modules/car-color/entities/car-color.entity';
import { Property } from 'src/modules/property/entities/property.entity';
export declare class Photo {
    id: number;
    photoKey: string;
    smallFilePath: string;
    mediumFilePath: string;
    largeFilePath: string;
    status: string;
    thumbnail: boolean;
    carColor: CarColor;
    property: Property;
    createdAt: Date;
    updatedAt: Date;
}
