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
exports.UserSetting = void 0;
const user_entity_1 = require("src/modules/user/entities/user.entity");
const typeorm_1 = require("typeorm");
let UserSetting = class UserSetting {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserSetting.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], UserSetting.prototype, "isHostView", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, (user) => user.userSetting),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], UserSetting.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], UserSetting.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], UserSetting.prototype, "updatedAt", void 0);
UserSetting = __decorate([
    (0, typeorm_1.Entity)()
], UserSetting);
exports.UserSetting = UserSetting;
//# sourceMappingURL=user-setting.entity.js.map