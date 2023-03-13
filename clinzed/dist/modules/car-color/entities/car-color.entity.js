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
exports.CarColor = void 0;
const enum_1 = require("src/common/enum");
const car_model_entity_1 = require("src/modules/car-model/entities/car-model.entity");
const color_entity_1 = require("src/modules/color/entities/color.entity");
const customer_car_entity_1 = require("src/modules/customer-car/entities/customer-car.entity");
const photo_entity_1 = require("src/modules/photo/entities/photo.entity");
const typeorm_1 = require("typeorm");
let CarColor = class CarColor {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CarColor.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => color_entity_1.Color, (Color) => Color.carColors, {
        onDelete: 'SET NULL',
        nullable: true,
    }),
    __metadata("design:type", color_entity_1.Color)
], CarColor.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => car_model_entity_1.CarModel, (carModel) => carModel.carYears, {
        onDelete: 'SET NULL',
        nullable: true,
    }),
    __metadata("design:type", car_model_entity_1.CarModel)
], CarColor.prototype, "carModel", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => customer_car_entity_1.CustomerCar, (CustomerCar) => CustomerCar.carColor, {
        onDelete: 'SET NULL',
        nullable: true,
    }),
    __metadata("design:type", Array)
], CarColor.prototype, "customerCars", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => photo_entity_1.Photo, (photo) => photo.carColor, {
        onDelete: 'CASCADE',
        nullable: true,
    }),
    __metadata("design:type", Array)
], CarColor.prototype, "photos", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enum_1.COMMON_STATUS,
        default: enum_1.COMMON_STATUS.ACTIVE,
    }),
    __metadata("design:type", String)
], CarColor.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], CarColor.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], CarColor.prototype, "updatedAt", void 0);
CarColor = __decorate([
    (0, typeorm_1.Entity)()
], CarColor);
exports.CarColor = CarColor;
//# sourceMappingURL=car-color.entity.js.map