"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const car_year_service_1 = require("./car-year.service");
describe('CarYearService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [car_year_service_1.CarYearService],
        }).compile();
        service = module.get(car_year_service_1.CarYearService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=car-year.service.spec.js.map