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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditCardController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("src/common/guards/jwt.guard");
const credit_card_service_1 = require("./credit-card.service");
const create_credit_card_dto_1 = require("./dto/create-credit-card.dto");
let CreditCardController = class CreditCardController {
    constructor(creditCardService) {
        this.creditCardService = creditCardService;
    }
    async create(createCreditCardDto, req) {
        return await this.creditCardService.create(createCreditCardDto, req.user);
    }
    async findAll(params, req) {
        return await this.creditCardService.findAll(params, req.user);
    }
    async findOne(id) {
        return await this.creditCardService.findOne(+id);
    }
    async defaultCard(id, req) {
        return await this.creditCardService.defaultCard(+id, req.user);
    }
    async remove(id, req) {
        return await this.creditCardService.remove(+id, req.user);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_credit_card_dto_1.CreateCreditCardDto, Object]),
    __metadata("design:returntype", Promise)
], CreditCardController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CreditCardController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CreditCardController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('default_card/:id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CreditCardController.prototype, "defaultCard", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CreditCardController.prototype, "remove", null);
CreditCardController = __decorate([
    (0, swagger_1.ApiTags)('credit-card'),
    (0, common_1.Controller)('credit-card'),
    __metadata("design:paramtypes", [credit_card_service_1.CreditCardService])
], CreditCardController);
exports.CreditCardController = CreditCardController;
//# sourceMappingURL=credit-card.controller.js.map