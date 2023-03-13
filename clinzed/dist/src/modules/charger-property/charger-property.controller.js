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
exports.ChargerPropertyController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("src/common/guards/jwt.guard");
const charger_property_service_1 = require("./charger-property.service");
const create_charger_property_dto_1 = require("./dto/create-charger-property.dto");
const update_charger_property_dto_1 = require("./dto/update-charger-property.dto");
let ChargerPropertyController = class ChargerPropertyController {
    constructor(chargerPropertyService) {
        this.chargerPropertyService = chargerPropertyService;
    }
    create(createChargerPropertyDto, req) {
        return this.chargerPropertyService.create(createChargerPropertyDto, req.user);
    }
    async update(id, updateChargerPropertyDto, req) {
        return this.chargerPropertyService.update(+id, updateChargerPropertyDto, req.user);
    }
    findAll(params, req) {
        return this.chargerPropertyService.findAll(params, req.user);
    }
    findOne(id) {
        return this.chargerPropertyService.findOne(+id);
    }
    remove(id, req) {
        return this.chargerPropertyService.remove(+id, req.user);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_charger_property_dto_1.CreateChargerPropertyDto, Object]),
    __metadata("design:returntype", void 0)
], ChargerPropertyController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_charger_property_dto_1.UpdateChargerPropertyDto, Object]),
    __metadata("design:returntype", Promise)
], ChargerPropertyController.prototype, "update", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)('')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ChargerPropertyController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChargerPropertyController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ChargerPropertyController.prototype, "remove", null);
ChargerPropertyController = __decorate([
    (0, common_1.Controller)('charger-property'),
    __metadata("design:paramtypes", [charger_property_service_1.ChargerPropertyService])
], ChargerPropertyController);
exports.ChargerPropertyController = ChargerPropertyController;
//# sourceMappingURL=charger-property.controller.js.map