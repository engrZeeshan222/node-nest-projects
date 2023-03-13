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
exports.CreditCard = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("src/modules/user/entities/user.entity");
const enum_1 = require("src/common/enum");
let CreditCard = class CreditCard {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CreditCard.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, nullable: false }),
    __metadata("design:type", String)
], CreditCard.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enum_1.CARD_TYPE,
        default: enum_1.CARD_TYPE.DEBIT,
    }),
    __metadata("design:type", String)
], CreditCard.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enum_1.CARD_STATUS,
        default: enum_1.CARD_STATUS.ACTIVE,
    }),
    __metadata("design:type", String)
], CreditCard.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, nullable: true }),
    __metadata("design:type", String)
], CreditCard.prototype, "lastFourDigits", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, nullable: true }),
    __metadata("design:type", String)
], CreditCard.prototype, "expDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, nullable: true }),
    __metadata("design:type", String)
], CreditCard.prototype, "zipCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, nullable: true }),
    __metadata("design:type", String)
], CreditCard.prototype, "stripeCardId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: Boolean,
        default: false,
    }),
    __metadata("design:type", Boolean)
], CreditCard.prototype, "isDefault", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.creditCard, {
        onDelete: 'SET NULL',
        nullable: true,
    }),
    __metadata("design:type", user_entity_1.User)
], CreditCard.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], CreditCard.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], CreditCard.prototype, "updatedAt", void 0);
CreditCard = __decorate([
    (0, typeorm_1.Entity)()
], CreditCard);
exports.CreditCard = CreditCard;
//# sourceMappingURL=credit-card.entity.js.map