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
exports.Photo = void 0;
const enum_1 = require("src/common/enum");
const car_color_entity_1 = require("src/modules/car-color/entities/car-color.entity");
const property_entity_1 = require("src/modules/property/entities/property.entity");
const typeorm_1 = require("typeorm");
let Photo = class Photo {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Photo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, nullable: false }),
    __metadata("design:type", String)
], Photo.prototype, "photoKey", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, nullable: true }),
    __metadata("design:type", String)
], Photo.prototype, "smallFilePath", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, nullable: true }),
    __metadata("design:type", String)
], Photo.prototype, "mediumFilePath", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, nullable: true }),
    __metadata("design:type", String)
], Photo.prototype, "largeFilePath", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enum_1.PHOTO_STATUS,
        default: enum_1.PHOTO_STATUS.ACTIVE,
    }),
    __metadata("design:type", String)
], Photo.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: Boolean,
        default: false,
    }),
    __metadata("design:type", Boolean)
], Photo.prototype, "thumbnail", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => car_color_entity_1.CarColor, (CarColor) => CarColor.photos, {
        onDelete: 'SET NULL',
        nullable: true,
    }),
    __metadata("design:type", car_color_entity_1.CarColor)
], Photo.prototype, "carColor", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => property_entity_1.Property, (property) => property.photos, {
        onDelete: 'SET NULL',
        nullable: true,
    }),
    __metadata("design:type", property_entity_1.Property)
], Photo.prototype, "property", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], Photo.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], Photo.prototype, "updatedAt", void 0);
Photo = __decorate([
    (0, typeorm_1.Entity)()
], Photo);
exports.Photo = Photo;
//# sourceMappingURL=photo.entity.js.map