import { Repository } from 'typeorm';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { Photo } from './entities/photo.entity';
export declare class PhotoService {
    private readonly photoRepository;
    constructor(photoRepository: Repository<Photo>);
    create(createPhotoDto: CreatePhotoDto): Promise<Photo>;
    findOne(id: number): Promise<Photo>;
    changeThumbnail(id: number): Promise<Photo>;
    remove(id: number): Promise<Photo>;
}
