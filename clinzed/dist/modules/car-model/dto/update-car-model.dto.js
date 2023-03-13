"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCarModelDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_car_model_dto_1 = require("./create-car-model.dto");
class UpdateCarModelDto extends (0, swagger_1.PartialType)(create_car_model_dto_1.CreateCarModelDto) {
}
exports.UpdateCarModelDto = UpdateCarModelDto;
//# sourceMappingURL=update-car-model.dto.js.map