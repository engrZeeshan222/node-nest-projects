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
exports.CreatePhotoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const car_color_entity_1 = require("src/modules/car-color/entities/car-color.entity");
const property_entity_1 = require("src/modules/property/entities/property.entity");
class CreatePhotoDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], CreatePhotoDto.prototype, "photoKey", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], CreatePhotoDto.prototype, "smallFilePath", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], CreatePhotoDto.prototype, "mediumFilePath", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], CreatePhotoDto.prototype, "largeFilePath", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], CreatePhotoDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", car_color_entity_1.CarColor)
], CreatePhotoDto.prototype, "carColor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", property_entity_1.Property)
], CreatePhotoDto.prototype, "property", void 0);
exports.CreatePhotoDto = CreatePhotoDto;
//# sourceMappingURL=create-photo.dto.js.map