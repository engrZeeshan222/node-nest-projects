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
exports.CustomerCar = void 0;
const enum_1 = require("src/common/enum");
const car_color_entity_1 = require("src/modules/car-color/entities/car-color.entity");
const car_model_entity_1 = require("src/modules/car-model/entities/car-model.entity");
const car_year_entity_1 = require("src/modules/car-year/entities/car-year.entity");
const user_entity_1 = require("src/modules/user/entities/user.entity");
const typeorm_1 = require("typeorm");
let CustomerCar = class CustomerCar {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CustomerCar.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], CustomerCar.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CustomerCar.prototype, "licensePlate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enum_1.CUSTOMER_CAR_STATUS,
        default: enum_1.CUSTOMER_CAR_STATUS.ACTIVE,
    }),
    __metadata("design:type", String)
], CustomerCar.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.customerCar, {
        onDelete: 'SET NULL',
        nullable: true,
    }),
    __metadata("design:type", user_entity_1.User)
], CustomerCar.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => car_model_entity_1.CarModel, (CarModel) => CarModel.customerCars, {
        onDelete: 'SET NULL',
        nullable: true,
    }),
    __metadata("design:type", car_model_entity_1.CarModel)
], CustomerCar.prototype, "carModel", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => car_color_entity_1.CarColor, (carColor) => carColor.customerCars, {
        onDelete: 'SET NULL',
        nullable: true,
    }),
    __metadata("design:type", car_color_entity_1.CarColor)
], CustomerCar.prototype, "carColor", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => car_year_entity_1.CarYear, (carYear) => carYear.customerCars, {
        onDelete: 'SET NULL',
        nullable: true,
    }),
    __metadata("design:type", car_year_entity_1.CarYear)
], CustomerCar.prototype, "carYear", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], CustomerCar.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], CustomerCar.prototype, "updatedAt", void 0);
CustomerCar = __decorate([
    (0, typeorm_1.Entity)()
], CustomerCar);
exports.CustomerCar = CustomerCar;
//# sourceMappingURL=customer-car.entity.js.map