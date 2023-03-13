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
exports.YearChargerTypeController = void 0;
const common_1 = require("@nestjs/common");
const year_charger_type_service_1 = require("./year-charger-type.service");
const create_year_charger_type_dto_1 = require("./dto/create-year-charger-type.dto");
const roles_decorator_1 = require("src/common/decorators/roles.decorator");
const enum_1 = require("src/common/enum");
const jwt_guard_1 = require("src/common/guards/jwt.guard");
const roles_guard_1 = require("src/common/guards/roles.guard");
let YearChargerTypeController = class YearChargerTypeController {
    constructor(yearChargerTypeService) {
        this.yearChargerTypeService = yearChargerTypeService;
    }
    async create(createYearChargerTypeDto) {
        return this.yearChargerTypeService.create(createYearChargerTypeDto);
    }
    async findAll() {
        return await this.yearChargerTypeService.findAll();
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(enum_1.Role.ADMIN),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_year_charger_type_dto_1.CreateYearChargerTypeDto]),
    __metadata("design:returntype", Promise)
], YearChargerTypeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(enum_1.Role.ADMIN),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], YearChargerTypeController.prototype, "findAll", null);
YearChargerTypeController = __decorate([
    (0, common_1.Controller)('year-charger-type'),
    __metadata("design:paramtypes", [year_charger_type_service_1.YearChargerTypeService])
], YearChargerTypeController);
exports.YearChargerTypeController = YearChargerTypeController;
//# sourceMappingURL=year-charger-type.controller.js.map