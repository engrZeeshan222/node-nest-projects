"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserSettingDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_user_setting_dto_1 = require("./create-user-setting.dto");
class UpdateUserSettingDto extends (0, swagger_1.PartialType)(create_user_setting_dto_1.CreateUserSettingDto) {
}
exports.UpdateUserSettingDto = UpdateUserSettingDto;
//# sourceMappingURL=update-user-setting.dto.js.map