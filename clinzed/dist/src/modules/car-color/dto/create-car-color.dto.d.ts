import { CarModel } from 'src/modules/car-model/entities/car-model.entity';
import { Color } from 'src/modules/color/entities/color.entity';
export declare class CreateCarColorDto {
    readonly color: Color;
    readonly carModel: CarModel;
}
