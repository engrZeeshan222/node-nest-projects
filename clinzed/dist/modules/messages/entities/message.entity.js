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
exports.Message = void 0;
const message_thread_entity_1 = require("src/modules/message-thread/entities/message-thread.entity");
const user_entity_1 = require("src/modules/user/entities/user.entity");
const typeorm_1 = require("typeorm");
let Message = class Message {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Message.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, nullable: false }),
    __metadata("design:type", String)
], Message.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.userMessage, {
        onDelete: 'SET NULL',
        nullable: true,
    }),
    __metadata("design:type", user_entity_1.User)
], Message.prototype, "sender", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        default: null,
    }),
    __metadata("design:type", Date)
], Message.prototype, "dateSent", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], Message.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], Message.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => message_thread_entity_1.MessageThread, (messageThread) => messageThread.messages, {
        onDelete: 'SET NULL',
        nullable: true,
    }),
    __metadata("design:type", message_thread_entity_1.MessageThread)
], Message.prototype, "messageThread", void 0);
Message = __decorate([
    (0, typeorm_1.Entity)()
], Message);
exports.Message = Message;
//# sourceMappingURL=message.entity.js.map