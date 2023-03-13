import { CarColor } from 'src/modules/car-color/entities/car-color.entity';
import { Property } from 'src/modules/property/entities/property.entity';
export declare class CreatePhotoDto {
    photoKey?: string;
    smallFilePath?: string;
    mediumFilePath?: string;
    largeFilePath?: string;
    status?: string;
    carColor?: CarColor;
    property?: Property;
}
