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
exports.InternalNote = void 0;
const address_entity_1 = require("src/modules/address/entities/address.entity");
const property_entity_1 = require("src/modules/property/entities/property.entity");
const typeorm_1 = require("typeorm");
let InternalNote = class InternalNote {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], InternalNote.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, nullable: false }),
    __metadata("design:type", String)
], InternalNote.prototype, "messageBody", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => property_entity_1.Property, (property) => property.internalNote, {
        onDelete: 'CASCADE',
        nullable: true,
    }),
    __metadata("design:type", Array)
], InternalNote.prototype, "property", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => address_entity_1.Address, (address) => address.internalNote, {
        onDelete: 'CASCADE',
        nullable: true,
    }),
    __metadata("design:type", Array)
], InternalNote.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], InternalNote.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], InternalNote.prototype, "updatedAt", void 0);
InternalNote = __decorate([
    (0, typeorm_1.Entity)()
], InternalNote);
exports.InternalNote = InternalNote;
//# sourceMappingURL=internal-note.entity.js.map