"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarYearModule = void 0;
const common_1 = require("@nestjs/common");
const car_year_service_1 = require("./car-year.service");
const car_year_controller_1 = require("./car-year.controller");
const typeorm_1 = require("@nestjs/typeorm");
const car_year_entity_1 = require("./entities/car-year.entity");
let CarYearModule = class CarYearModule {
};
CarYearModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([car_year_entity_1.CarYear])],
        controllers: [car_year_controller_1.CarYearController],
        providers: [car_year_service_1.CarYearService],
    })
], CarYearModule);
exports.CarYearModule = CarYearModule;
//# sourceMappingURL=car-year.module.js.map