"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarModelModule = void 0;
const common_1 = require("@nestjs/common");
const car_model_service_1 = require("./car-model.service");
const car_model_controller_1 = require("./car-model.controller");
const typeorm_1 = require("@nestjs/typeorm");
const car_model_entity_1 = require("./entities/car-model.entity");
let CarModelModule = class CarModelModule {
};
CarModelModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([car_model_entity_1.CarModel])],
        controllers: [car_model_controller_1.CarModelController],
        providers: [car_model_service_1.CarModelService],
    })
], CarModelModule);
exports.CarModelModule = CarModelModule;
//# sourceMappingURL=car-model.module.js.map