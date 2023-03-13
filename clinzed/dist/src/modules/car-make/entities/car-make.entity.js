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
exports.CarMake = void 0;
const enum_1 = require("src/common/enum");
const car_model_entity_1 = require("src/modules/car-model/entities/car-model.entity");
const typeorm_1 = require("typeorm");
let CarMake = class CarMake {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CarMake.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, unique: true }),
    __metadata("design:type", String)
], CarMake.prototype, "make", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => car_model_entity_1.CarModel, (carModel) => carModel.carMake, {
        onDelete: 'SET NULL',
        nullable: true,
    }),
    __metadata("design:type", Array)
], CarMake.prototype, "carModels", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enum_1.COMMON_STATUS,
        default: enum_1.COMMON_STATUS.ACTIVE,
    }),
    __metadata("design:type", String)
], CarMake.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], CarMake.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], CarMake.prototype, "updatedAt", void 0);
CarMake = __decorate([
    (0, typeorm_1.Entity)()
], CarMake);
exports.CarMake = CarMake;
//# sourceMappingURL=car-make.entity.js.map