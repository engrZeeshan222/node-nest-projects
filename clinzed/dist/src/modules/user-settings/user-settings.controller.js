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
exports.UserSettingsController = void 0;
const common_1 = require("@nestjs/common");
const user_settings_service_1 = require("./user-settings.service");
const update_user_setting_dto_1 = require("./dto/update-user-setting.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("src/common/guards/jwt.guard");
let UserSettingsController = class UserSettingsController {
    constructor(userSettingsService) {
        this.userSettingsService = userSettingsService;
    }
    async findOne(id, req) {
        return this.userSettingsService.findOne(+id, req.user);
    }
    async update(id, updateUserSettingDto, req) {
        return this.userSettingsService.update(+id, updateUserSettingDto, req.user);
    }
};
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserSettingsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_setting_dto_1.UpdateUserSettingDto, Object]),
    __metadata("design:returntype", Promise)
], UserSettingsController.prototype, "update", null);
UserSettingsController = __decorate([
    (0, swagger_1.ApiTags)('user-settings'),
    (0, common_1.Controller)('user-settings'),
    __metadata("design:paramtypes", [user_settings_service_1.UserSettingsService])
], UserSettingsController);
exports.UserSettingsController = UserSettingsController;
//# sourceMappingURL=user-settings.controller.js.map