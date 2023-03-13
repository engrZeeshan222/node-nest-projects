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
exports.CustomerCarController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("src/common/decorators/roles.decorator");
const enum_1 = require("src/common/enum");
const jwt_guard_1 = require("src/common/guards/jwt.guard");
const customer_car_service_1 = require("./customer-car.service");
const create_customer_car_dto_1 = require("./dto/create-customer-car.dto");
const update_customer_car_dto_1 = require("./dto/update-customer-car.dto");
let CustomerCarController = class CustomerCarController {
    constructor(customerCarService) {
        this.customerCarService = customerCarService;
    }
    async create(createCustomerCarDto, req) {
        return await this.customerCarService.create(createCustomerCarDto, req.user);
    }
    async findAll(params, req) {
        return await this.customerCarService.findAll(params, req.user);
    }
    async findOne(id) {
        return await this.customerCarService.findOne(+id);
    }
    async update(id, updateCustomerCarDto, req) {
        return await this.customerCarService.update(+id, updateCustomerCarDto, req.user);
    }
    async remove(id, req) {
        return await this.customerCarService.remove(+id, req.user);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_customer_car_dto_1.CreateCustomerCarDto, Object]),
    __metadata("design:returntype", Promise)
], CustomerCarController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)('')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CustomerCarController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomerCarController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(enum_1.Role.ADMIN),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_customer_car_dto_1.UpdateCustomerCarDto, Object]),
    __metadata("design:returntype", Promise)
], CustomerCarController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CustomerCarController.prototype, "remove", null);
CustomerCarController = __decorate([
    (0, swagger_1.ApiTags)('customer-car'),
    (0, common_1.Controller)('customer-car'),
    __metadata("design:paramtypes", [customer_car_service_1.CustomerCarService])
], CustomerCarController);
exports.CustomerCarController = CustomerCarController;
//# sourceMappingURL=customer-car.controller.js.map