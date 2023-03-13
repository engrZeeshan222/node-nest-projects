import { PhotoService } from './photo.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
export declare class PhotoController {
    private readonly photoService;
    constructor(photoService: PhotoService);
    create(createPhotoDto: CreatePhotoDto, image: any): Promise<import("./entities/photo.entity").Photo>;
    findOne(id: string): Promise<import("./entities/photo.entity").Photo>;
    changeThumbnail(id: string): Promise<import("./entities/photo.entity").Photo>;
    delete(id: string): Promise<import("./entities/photo.entity").Photo>;
}
