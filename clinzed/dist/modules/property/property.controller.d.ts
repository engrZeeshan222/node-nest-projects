import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
export declare class PropertyController {
    private readonly propertyService;
    constructor(propertyService: PropertyService);
    create(createPropertyDto: CreatePropertyDto, req: any): Promise<import("./entities/property.entity").Property>;
    findAll(params: any, req: any): Promise<any>;
    findOne(id: string): Promise<import("./entities/property.entity").Property>;
    averageRate(zipCode: string): Promise<number>;
    update(id: string, updatePropertyDto: UpdatePropertyDto, req: any): Promise<import("./entities/property.entity").Property>;
    pauseProperty(id: string, updatePropertyDto: UpdatePropertyDto, req: any): Promise<import("./entities/property.entity").Property>;
    remove(id: string, req: any): Promise<import("./entities/property.entity").Property>;
}
