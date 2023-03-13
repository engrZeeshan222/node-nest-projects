"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChargerPropertyModule = void 0;
const common_1 = require("@nestjs/common");
const charger_property_service_1 = require("./charger-property.service");
const charger_property_controller_1 = require("./charger-property.controller");
const typeorm_1 = require("@nestjs/typeorm");
const charger_property_entity_1 = require("./entities/charger-property.entity");
const property_module_1 = require("../property/property.module");
let ChargerPropertyModule = class ChargerPropertyModule {
};
ChargerPropertyModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([charger_property_entity_1.ChargerProperty]),
            (0, common_1.forwardRef)(() => property_module_1.PropertyModule),
        ],
        controllers: [charger_property_controller_1.ChargerPropertyController],
        providers: [charger_property_service_1.ChargerPropertyService],
        exports: [charger_property_service_1.ChargerPropertyService],
    })
], ChargerPropertyModule);
exports.ChargerPropertyModule = ChargerPropertyModule;
//# sourceMappingURL=charger-property.module.js.map