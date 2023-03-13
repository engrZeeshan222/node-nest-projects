import { ColorService } from './color.service';
import { CreateColorDto } from './dto/create-color.dto';
import { Color } from './entities/color.entity';
export declare class ColorController {
    private readonly colorService;
    constructor(colorService: ColorService);
    create(createColorDto: CreateColorDto): Promise<Color>;
    findAll(params: any, req: any): Promise<Color[]>;
    findOne(id: string): Promise<Color>;
}
