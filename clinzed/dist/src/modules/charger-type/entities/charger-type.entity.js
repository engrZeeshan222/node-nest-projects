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
exports.ChargerType = void 0;
const enum_1 = require("src/common/enum");
const charger_property_entity_1 = require("src/modules/charger-property/entities/charger-property.entity");
const year_charger_type_entity_1 = require("src/modules/year-charger-type/entities/year-charger-type.entity");
const typeorm_1 = require("typeorm");
let ChargerType = class ChargerType {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ChargerType.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], ChargerType.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => year_charger_type_entity_1.YearChargerType, (yearChargerType) => yearChargerType.chargerType, {
        onDelete: 'CASCADE',
        nullable: true,
    }),
    __metadata("design:type", Array)
], ChargerType.prototype, "yearChargerTypes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => charger_property_entity_1.ChargerProperty, (chargerProperty) => chargerProperty.chargerType, {
        onDelete: 'CASCADE',
        nullable: true,
    }),
    __metadata("design:type", Array)
], ChargerType.prototype, "chargerProperty", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enum_1.COMMON_STATUS,
        default: enum_1.COMMON_STATUS.ACTIVE,
    }),
    __metadata("design:type", String)
], ChargerType.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], ChargerType.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], ChargerType.prototype, "updatedAt", void 0);
ChargerType = __decorate([
    (0, typeorm_1.Entity)()
], ChargerType);
exports.ChargerType = ChargerType;
//# sourceMappingURL=charger-type.entity.js.map