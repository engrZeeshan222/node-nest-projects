"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerCarModule = void 0;
const common_1 = require("@nestjs/common");
const customer_car_service_1 = require("./customer-car.service");
const customer_car_controller_1 = require("./customer-car.controller");
const typeorm_1 = require("@nestjs/typeorm");
const customer_car_entity_1 = require("./entities/customer-car.entity");
const user_module_1 = require("../user/user.module");
let CustomerCarModule = class CustomerCarModule {
};
CustomerCarModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([customer_car_entity_1.CustomerCar]), user_module_1.UsersModule],
        controllers: [customer_car_controller_1.CustomerCarController],
        providers: [customer_car_service_1.CustomerCarService],
    })
], CustomerCarModule);
exports.CustomerCarModule = CustomerCarModule;
//# sourceMappingURL=customer-car.module.js.map