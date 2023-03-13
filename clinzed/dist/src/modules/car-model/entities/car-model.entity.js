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
exports.CarModel = void 0;
const enum_1 = require("src/common/enum");
const car_color_entity_1 = require("src/modules/car-color/entities/car-color.entity");
const car_make_entity_1 = require("src/modules/car-make/entities/car-make.entity");
const car_year_entity_1 = require("src/modules/car-year/entities/car-year.entity");
const customer_car_entity_1 = require("src/modules/customer-car/entities/customer-car.entity");
const typeorm_1 = require("typeorm");
let CarModel = class CarModel {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CarModel.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, unique: true }),
    __metadata("design:type", String)
], CarModel.prototype, "model", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enum_1.COMMON_STATUS,
        default: enum_1.COMMON_STATUS.ACTIVE,
    }),
    __metadata("design:type", String)
], CarModel.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => car_make_entity_1.CarMake, (carMake) => carMake.carModels, {
        onDelete: 'SET NULL',
        nullable: false,
    }),
    __metadata("design:type", car_make_entity_1.CarMake)
], CarModel.prototype, "carMake", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => car_year_entity_1.CarYear, (carYear) => carYear.carModel, {
        onDelete: 'SET NULL',
        nullable: true,
    }),
    __metadata("design:type", Array)
], CarModel.prototype, "carYears", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => car_color_entity_1.CarColor, (carColor) => carColor.carModel, {
        onDelete: 'SET NULL',
        nullable: true,
    }),
    __metadata("design:type", Array)
], CarModel.prototype, "carColors", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => customer_car_entity_1.CustomerCar, (CustomerCar) => CustomerCar.carModel, {
        onDelete: 'SET NULL',
        nullable: true,
    }),
    __metadata("design:type", Array)
], CarModel.prototype, "customerCars", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], CarModel.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], CarModel.prototype, "updatedAt", void 0);
CarModel = __decorate([
    (0, typeorm_1.Entity)()
], CarModel);
exports.CarModel = CarModel;
//# sourceMappingURL=car-model.entity.js.map