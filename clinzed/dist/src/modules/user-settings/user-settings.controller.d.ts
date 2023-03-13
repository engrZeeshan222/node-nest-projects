import { UserSettingsService } from './user-settings.service';
import { UpdateUserSettingDto } from './dto/update-user-setting.dto';
export declare class UserSettingsController {
    private readonly userSettingsService;
    constructor(userSettingsService: UserSettingsService);
    findOne(id: string, req: any): Promise<import("./entities/user-setting.entity").UserSetting>;
    update(id: string, updateUserSettingDto: UpdateUserSettingDto, req: any): Promise<import("./entities/user-setting.entity").UserSetting>;
}
