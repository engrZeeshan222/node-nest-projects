import { Query } from 'express-serve-static-core';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateColorDto } from './dto/create-color.dto';
import { Color } from './entities/color.entity';
export declare class ColorService {
    private readonly colorRepository;
    constructor(colorRepository: Repository<Color>);
    create(createColorDto: CreateColorDto): Promise<Color>;
    findAll(queryParams: Query, user: User): Promise<Color[]>;
    findOne(id: number): Promise<Color>;
}
