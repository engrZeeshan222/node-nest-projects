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
exports.ChargerProperty = void 0;
const charger_type_entity_1 = require("src/modules/charger-type/entities/charger-type.entity");
const property_entity_1 = require("src/modules/property/entities/property.entity");
const typeorm_1 = require("typeorm");
let ChargerProperty = class ChargerProperty {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ChargerProperty.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => charger_type_entity_1.ChargerType, (chargerType) => chargerType.chargerProperty, {
        onDelete: 'SET NULL',
        nullable: true,
    }),
    __metadata("design:type", charger_type_entity_1.ChargerType)
], ChargerProperty.prototype, "chargerType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => property_entity_1.Property, (property) => property.chargerProperty, {
        onDelete: 'SET NULL',
        nullable: true,
    }),
    __metadata("design:type", property_entity_1.Property)
], ChargerProperty.prototype, "property", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], ChargerProperty.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], ChargerProperty.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], ChargerProperty.prototype, "updatedAt", void 0);
ChargerProperty = __decorate([
    (0, typeorm_1.Entity)()
], ChargerProperty);
exports.ChargerProperty = ChargerProperty;
//# sourceMappingURL=charger-property.entity.js.map