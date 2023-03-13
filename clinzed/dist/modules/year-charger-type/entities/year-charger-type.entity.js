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
exports.YearChargerType = void 0;
const car_year_entity_1 = require("src/modules/car-year/entities/car-year.entity");
const charger_type_entity_1 = require("src/modules/charger-type/entities/charger-type.entity");
const typeorm_1 = require("typeorm");
let YearChargerType = class YearChargerType {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], YearChargerType.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => car_year_entity_1.CarYear, (carYear) => carYear.yearChargerTypes, {
        onDelete: 'SET NULL',
        nullable: true,
    }),
    __metadata("design:type", car_year_entity_1.CarYear)
], YearChargerType.prototype, "carYear", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => charger_type_entity_1.ChargerType, (chargerType) => chargerType.yearChargerTypes, {
        onDelete: 'SET NULL',
        nullable: true,
    }),
    __metadata("design:type", charger_type_entity_1.ChargerType)
], YearChargerType.prototype, "chargerType", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], YearChargerType.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], YearChargerType.prototype, "updatedAt", void 0);
YearChargerType = __decorate([
    (0, typeorm_1.Entity)()
], YearChargerType);
exports.YearChargerType = YearChargerType;
//# sourceMappingURL=year-charger-type.entity.js.map