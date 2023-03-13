"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarColorModule = void 0;
const common_1 = require("@nestjs/common");
const car_color_service_1 = require("./car-color.service");
const car_color_controller_1 = require("./car-color.controller");
const typeorm_1 = require("@nestjs/typeorm");
const car_color_entity_1 = require("./entities/car-color.entity");
let CarColorModule = class CarColorModule {
};
CarColorModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([car_color_entity_1.CarColor])],
        controllers: [car_color_controller_1.CarColorController],
        providers: [car_color_service_1.CarColorService],
    })
], CarColorModule);
exports.CarColorModule = CarColorModule;
//# sourceMappingURL=car-color.module.js.map