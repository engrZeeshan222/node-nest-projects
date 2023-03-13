"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const car_year_controller_1 = require("./car-year.controller");
const car_year_service_1 = require("./car-year.service");
describe('CarYearController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [car_year_controller_1.CarYearController],
            providers: [car_year_service_1.CarYearService],
        }).compile();
        controller = module.get(car_year_controller_1.CarYearController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=car-year.controller.spec.js.map