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
exports.CarMakeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("src/common/decorators/roles.decorator");
const enum_1 = require("src/common/enum");
const jwt_guard_1 = require("src/common/guards/jwt.guard");
const roles_guard_1 = require("src/common/guards/roles.guard");
const car_make_service_1 = require("./car-make.service");
const create_car_make_dto_1 = require("./dto/create-car-make.dto");
let CarMakeController = class CarMakeController {
    constructor(carMakeService) {
        this.carMakeService = carMakeService;
    }
    async create(createCarMakeDto) {
        return await this.carMakeService.create(createCarMakeDto);
    }
    async findAll(params, req) {
        return await this.carMakeService.findAll(params, req.user);
    }
    async remove(id) {
        return await this.carMakeService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(enum_1.Role.ADMIN),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_car_make_dto_1.CreateCarMakeDto]),
    __metadata("design:returntype", Promise)
], CarMakeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)('')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CarMakeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(enum_1.Role.ADMIN),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CarMakeController.prototype, "remove", null);
CarMakeController = __decorate([
    (0, swagger_1.ApiTags)('car-make'),
    (0, common_1.Controller)('car-make'),
    __metadata("design:paramtypes", [car_make_service_1.CarMakeService])
], CarMakeController);
exports.CarMakeController = CarMakeController;
//# sourceMappingURL=car-make.controller.js.map