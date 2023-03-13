"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarMakeModule = void 0;
const common_1 = require("@nestjs/common");
const car_make_service_1 = require("./car-make.service");
const car_make_controller_1 = require("./car-make.controller");
const typeorm_1 = require("@nestjs/typeorm");
const car_make_entity_1 = require("./entities/car-make.entity");
let CarMakeModule = class CarMakeModule {
};
CarMakeModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([car_make_entity_1.CarMake])],
        controllers: [car_make_controller_1.CarMakeController],
        providers: [car_make_service_1.CarMakeService],
    })
], CarMakeModule);
exports.CarMakeModule = CarMakeModule;
//# sourceMappingURL=car-make.module.js.map