"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCarColorDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_car_color_dto_1 = require("./create-car-color.dto");
class UpdateCarColorDto extends (0, swagger_1.PartialType)(create_car_color_dto_1.CreateCarColorDto) {
}
exports.UpdateCarColorDto = UpdateCarColorDto;
//# sourceMappingURL=update-car-color.dto.js.map