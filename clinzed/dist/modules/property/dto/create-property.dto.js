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
exports.CreatePropertyDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const address_entity_1 = require("src/modules/address/entities/address.entity");
const internal_note_entity_1 = require("src/modules/internal-note/entities/internal-note.entity");
class CreatePropertyDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePropertyDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], CreatePropertyDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], CreatePropertyDto.prototype, "guestInstructions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreatePropertyDto.prototype, "costPerMinute", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreatePropertyDto.prototype, "lengthInch", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreatePropertyDto.prototype, "heightInch", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreatePropertyDto.prototype, "widthInch", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreatePropertyDto.prototype, "carCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", address_entity_1.Address)
], CreatePropertyDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], CreatePropertyDto.prototype, "messageBody", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", Array)
], CreatePropertyDto.prototype, "chargers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", internal_note_entity_1.InternalNote)
], CreatePropertyDto.prototype, "internalNote", void 0);
exports.CreatePropertyDto = CreatePropertyDto;
//# sourceMappingURL=create-property.dto.js.map