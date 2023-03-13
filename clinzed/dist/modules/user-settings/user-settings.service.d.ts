import { Repository } from 'typeorm';
import { Query } from 'typeorm/driver/Query';
import { User } from '../user/entities/user.entity';
import { CreateUserSettingDto } from './dto/create-user-setting.dto';
import { UpdateUserSettingDto } from './dto/update-user-setting.dto';
import { UserSetting } from './entities/user-setting.entity';
export declare class UserSettingsService {
    private readonly userSettingRepository;
    constructor(userSettingRepository: Repository<UserSetting>);
    create(createUserSettingDto: CreateUserSettingDto): Promise<UserSetting>;
    findAll(queryParams: Query, user: User): Promise<any>;
    findOne(id: number, loginUser: User): Promise<UserSetting>;
    update(id: number, updateUserSettingDto: UpdateUserSettingDto, loginUser: User): Promise<UserSetting>;
}
