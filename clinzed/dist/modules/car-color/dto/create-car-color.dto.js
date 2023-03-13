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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCarColorDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const car_model_entity_1 = require("src/modules/car-model/entities/car-model.entity");
const color_entity_1 = require("src/modules/color/entities/color.entity");
class CreateCarColorDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", color_entity_1.Color)
], CreateCarColorDto.prototype, "color", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", car_model_entity_1.CarModel)
], CreateCarColorDto.prototype, "carModel", void 0);
exports.CreateCarColorDto = CreateCarColorDto;
//# sourceMappingURL=create-car-color.dto.js.map