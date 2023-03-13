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
exports.FieldGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
let FieldGuard = class FieldGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const fields = this.reflector.get('fields', context.getHandler());
        const request = context.switchToHttp().getRequest();
        if (!fields || fields.length < 1) {
            return true;
        }
        fields.forEach((element) => {
            if (request.body[element]) {
                throw new common_1.HttpException(`You are not allowed to set this field ${element}`, common_1.HttpStatus.FORBIDDEN);
            }
        });
        return true;
    }
};
FieldGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], FieldGuard);
exports.FieldGuard = FieldGuard;
//# sourceMappingURL=fields.guard.js.map