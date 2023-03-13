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
exports.User = void 0;
const enum_1 = require("src/common/enum");
const credit_card_entity_1 = require("src/modules/credit-card/entities/credit-card.entity");
const customer_car_entity_1 = require("src/modules/customer-car/entities/customer-car.entity");
const message_thread_entity_1 = require("src/modules/message-thread/entities/message-thread.entity");
const message_entity_1 = require("src/modules/messages/entities/message.entity");
const property_entity_1 = require("src/modules/property/entities/property.entity");
const user_setting_entity_1 = require("src/modules/user-settings/entities/user-setting.entity");
const typeorm_1 = require("typeorm");
let User = class User {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ select: false, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "stripeAccountId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enum_1.UserStatus,
        default: enum_1.UserStatus.PENDING,
    }),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enum_1.Role,
        default: enum_1.Role.USER,
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "provider", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "googleId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "facebookId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_setting_entity_1.UserSetting, (userSetting) => userSetting.user),
    __metadata("design:type", user_setting_entity_1.UserSetting)
], User.prototype, "userSetting", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => credit_card_entity_1.CreditCard, (creditCard) => creditCard.user, {
        onDelete: 'SET NULL',
        nullable: true,
    }),
    __metadata("design:type", Array)
], User.prototype, "creditCard", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => customer_car_entity_1.CustomerCar, (customerCar) => customerCar.user, {
        onDelete: 'SET NULL',
        nullable: true,
    }),
    __metadata("design:type", Array)
], User.prototype, "customerCar", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => property_entity_1.Property, (Property) => Property.host, {
        onDelete: 'SET NULL',
        nullable: true,
    }),
    __metadata("design:type", Array)
], User.prototype, "Property", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => message_thread_entity_1.MessageThread, (hostMessage) => hostMessage.host, {
        onDelete: 'SET NULL',
        nullable: true,
    }),
    __metadata("design:type", Array)
], User.prototype, "hostMessage", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => message_thread_entity_1.MessageThread, (customerMessage) => customerMessage.customer, {
        onDelete: 'SET NULL',
        nullable: true,
    }),
    __metadata("design:type", Array)
], User.prototype, "customerMessage", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => message_entity_1.Message, (message) => message.sender, {
        onDelete: 'SET NULL',
        nullable: true,
    }),
    __metadata("design:type", Array)
], User.prototype, "userMessage", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        default: null,
    }),
    __metadata("design:type", Date)
], User.prototype, "lastCustomerLogin", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        default: null,
    }),
    __metadata("design:type", Date)
], User.prototype, "lastHostLogin", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
User = __decorate([
    (0, typeorm_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map