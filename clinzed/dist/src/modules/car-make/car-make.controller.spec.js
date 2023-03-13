"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const car_make_controller_1 = require("./car-make.controller");
const car_make_service_1 = require("./car-make.service");
describe('CarMakeController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [car_make_controller_1.CarMakeController],
            providers: [car_make_service_1.CarMakeService],
        }).compile();
        controller = module.get(car_make_controller_1.CarMakeController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=car-make.controller.spec.js.map