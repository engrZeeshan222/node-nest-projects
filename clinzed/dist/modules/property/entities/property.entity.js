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
exports.Property = void 0;
const enum_1 = require("src/common/enum");
const address_entity_1 = require("src/modules/address/entities/address.entity");
const charger_property_entity_1 = require("src/modules/charger-property/entities/charger-property.entity");
const internal_note_entity_1 = require("src/modules/internal-note/entities/internal-note.entity");
const photo_entity_1 = require("src/modules/photo/entities/photo.entity");
const user_entity_1 = require("src/modules/user/entities/user.entity");
const typeorm_1 = require("typeorm");
let Property = class Property {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Property.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, nullable: false }),
    __metadata("design:type", String)
], Property.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, nullable: true }),
    __metadata("design:type", String)
], Property.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, nullable: true }),
    __metadata("design:type", String)
], Property.prototype, "guestInstructions", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], Property.prototype, "costPerMinute", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: false }),
    __metadata("design:type", Number)
], Property.prototype, "lengthInch", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: false }),
    __metadata("design:type", Number)
], Property.prototype, "heightInch", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: false }),
    __metadata("design:type", Number)
], Property.prototype, "widthInch", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: Number, nullable: false }),
    __metadata("design:type", Number)
], Property.prototype, "carCount", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => charger_property_entity_1.ChargerProperty, (chargerProperty) => chargerProperty.property, {
        onDelete: 'CASCADE',
        nullable: true,
    }),
    __metadata("design:type", Array)
], Property.prototype, "chargerProperty", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enum_1.PROPERTY_STATUS,
        default: enum_1.PROPERTY_STATUS.LISTED,
    }),
    __metadata("design:type", String)
], Property.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => photo_entity_1.Photo, (photo) => photo.property, {
        onDelete: 'CASCADE',
        nullable: true,
    }),
    __metadata("design:type", Array)
], Property.prototype, "photos", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => internal_note_entity_1.InternalNote, (InternalNote) => InternalNote.property, {
        onDelete: 'SET NULL',
        nullable: true,
    }),
    __metadata("design:type", internal_note_entity_1.InternalNote)
], Property.prototype, "internalNote", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => address_entity_1.Address, (address) => address.property, {
        onDelete: 'SET NULL',
        nullable: true,
    }),
    __metadata("design:type", address_entity_1.Address)
], Property.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.Property, {
        onDelete: 'SET NULL',
        nullable: true,
    }),
    __metadata("design:type", user_entity_1.User)
], Property.prototype, "host", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], Property.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], Property.prototype, "updatedAt", void 0);
Property = __decorate([
    (0, typeorm_1.Entity)()
], Property);
exports.Property = Property;
//# sourceMappingURL=property.entity.js.map