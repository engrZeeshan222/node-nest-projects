"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const customer_car_controller_1 = require("./customer-car.controller");
const customer_car_service_1 = require("./customer-car.service");
describe('CustomerCarController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [customer_car_controller_1.CustomerCarController],
            providers: [customer_car_service_1.CustomerCarService],
        }).compile();
        controller = module.get(customer_car_controller_1.CustomerCarController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=customer-car.controller.spec.js.map