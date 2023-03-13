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
exports.CreateChargerPropertyDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const charger_type_entity_1 = require("src/modules/charger-type/entities/charger-type.entity");
const property_entity_1 = require("src/modules/property/entities/property.entity");
class CreateChargerPropertyDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", property_entity_1.Property)
], CreateChargerPropertyDto.prototype, "property", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", charger_type_entity_1.ChargerType)
], CreateChargerPropertyDto.prototype, "chargerType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateChargerPropertyDto.prototype, "quantity", void 0);
exports.CreateChargerPropertyDto = CreateChargerPropertyDto;
//# sourceMappingURL=create-charger-property.dto.js.map