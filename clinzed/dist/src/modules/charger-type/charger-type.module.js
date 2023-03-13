"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChargerTypeModule = void 0;
const common_1 = require("@nestjs/common");
const charger_type_service_1 = require("./charger-type.service");
const charger_type_controller_1 = require("./charger-type.controller");
const typeorm_1 = require("@nestjs/typeorm");
const charger_type_entity_1 = require("./entities/charger-type.entity");
let ChargerTypeModule = class ChargerTypeModule {
};
ChargerTypeModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([charger_type_entity_1.ChargerType])],
        controllers: [charger_type_controller_1.ChargerTypeController],
        providers: [charger_type_service_1.ChargerTypeService],
    })
], ChargerTypeModule);
exports.ChargerTypeModule = ChargerTypeModule;
//# sourceMappingURL=charger-type.module.js.map