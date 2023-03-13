"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSettingsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const enum_1 = require("src/common/enum");
const typeorm_2 = require("typeorm");
const apiFeatures_1 = require("../utils/apiFeatures");
const user_setting_entity_1 = require("./entities/user-setting.entity");
const relationsArray = ['user'];
let UserSettingsService = class UserSettingsService {
    constructor(userSettingRepository) {
        this.userSettingRepository = userSettingRepository;
    }
    async create(createUserSettingDto) {
        try {
            let user_setting = await this.userSettingRepository.create(createUserSettingDto);
            user_setting = await this.userSettingRepository.save(user_setting);
            return user_setting;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async findAll(queryParams, user) {
        try {
            const apiData = new apiFeatures_1.default(this.userSettingRepository, queryParams);
            apiData.paginate().includeFields(relationsArray);
            const data2 = {
                id: (0, typeorm_2.Not)(user.id),
            };
            const where = [data2];
            apiData.where(where);
            const users = await apiData.query();
            return users;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async findOne(id, loginUser) {
        try {
            const userSetting = await this.userSettingRepository.findOne({
                where: {
                    id: id,
                },
                relations: relationsArray,
            });
            if (loginUser.role == enum_1.Role.ADMIN || userSetting.user.id == loginUser.id) {
                if (!userSetting) {
                    throw new common_1.HttpException('No user found', common_1.HttpStatus.NOT_FOUND);
                }
                return userSetting;
            }
            else {
                throw new common_1.HttpException('Forrbidden', common_1.HttpStatus.FORBIDDEN);
            }
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async update(id, updateUserSettingDto, loginUser) {
        try {
            let userSetting = await this.findOne(id, loginUser);
            userSetting = await this.userSettingRepository.save(Object.assign(Object.assign({}, userSetting), updateUserSettingDto));
            return userSetting;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
};
UserSettingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_setting_entity_1.UserSetting)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserSettingsService);
exports.UserSettingsService = UserSettingsService;
//# sourceMappingURL=user-settings.service.js.map