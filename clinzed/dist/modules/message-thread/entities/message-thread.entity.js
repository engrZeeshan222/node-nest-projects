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
exports.MessageThread = void 0;
const message_entity_1 = require("src/modules/messages/entities/message.entity");
const user_entity_1 = require("src/modules/user/entities/user.entity");
const typeorm_1 = require("typeorm");
let MessageThread = class MessageThread {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MessageThread.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, nullable: false }),
    __metadata("design:type", String)
], MessageThread.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], MessageThread.prototype, "isReadCustomer", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], MessageThread.prototype, "isReadHost", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.hostMessage, {
        onDelete: 'SET NULL',
        nullable: true,
    }),
    __metadata("design:type", user_entity_1.User)
], MessageThread.prototype, "host", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.customerMessage, {
        onDelete: 'SET NULL',
        nullable: true,
    }),
    __metadata("design:type", user_entity_1.User)
], MessageThread.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => message_entity_1.Message, (Message) => Message.message, {
        onDelete: 'SET NULL',
        nullable: true,
    }),
    __metadata("design:type", Array)
], MessageThread.prototype, "messages", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        default: null,
    }),
    __metadata("design:type", Date)
], MessageThread.prototype, "dateSent", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: Number,
        default: null,
    }),
    __metadata("design:type", Number)
], MessageThread.prototype, "customerUnreadCount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: Number,
        default: null,
    }),
    __metadata("design:type", Number)
], MessageThread.prototype, "hostUnreadCount", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], MessageThread.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], MessageThread.prototype, "updatedAt", void 0);
MessageThread = __decorate([
    (0, typeorm_1.Entity)()
], MessageThread);
exports.MessageThread = MessageThread;
//# sourceMappingURL=message-thread.entity.js.map