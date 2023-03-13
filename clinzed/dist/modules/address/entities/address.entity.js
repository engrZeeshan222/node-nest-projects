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
exports.Address = void 0;
const internal_note_entity_1 = require("src/modules/internal-note/entities/internal-note.entity");
const property_entity_1 = require("src/modules/property/entities/property.entity");
const typeorm_1 = require("typeorm");
let Address = class Address {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Address.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, unique: false }),
    __metadata("design:type", String)
], Address.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, unique: false }),
    __metadata("design:type", String)
], Address.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, unique: false }),
    __metadata("design:type", String)
], Address.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, unique: false }),
    __metadata("design:type", String)
], Address.prototype, "zip", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => internal_note_entity_1.InternalNote, (InternalNote) => InternalNote.address, {
        onDelete: 'SET NULL',
        nullable: true,
    }),
    __metadata("design:type", internal_note_entity_1.InternalNote)
], Address.prototype, "internalNote", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => property_entity_1.Property, (property) => property.address, {
        onDelete: 'CASCADE',
        nullable: true,
    }),
    __metadata("design:type", Array)
], Address.prototype, "property", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], Address.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], Address.prototype, "updatedAt", void 0);
Address = __decorate([
    (0, typeorm_1.Entity)()
], Address);
exports.Address = Address;
//# sourceMappingURL=address.entity.js.map