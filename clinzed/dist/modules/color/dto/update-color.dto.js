"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateColorDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_color_dto_1 = require("./create-color.dto");
class UpdateColorDto extends (0, swagger_1.PartialType)(create_color_dto_1.CreateColorDto) {
}
exports.UpdateColorDto = UpdateColorDto;
//# sourceMappingURL=update-color.dto.js.map