"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const customer_car_service_1 = require("./customer-car.service");
describe('CustomerCarService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [customer_car_service_1.CustomerCarService],
        }).compile();
        service = module.get(customer_car_service_1.CustomerCarService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=customer-car.service.spec.js.map