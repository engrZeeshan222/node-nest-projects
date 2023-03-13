"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const car_color_controller_1 = require("./car-color.controller");
const car_color_service_1 = require("./car-color.service");
describe('CarColorController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [car_color_controller_1.CarColorController],
            providers: [car_color_service_1.CarColorService],
        }).compile();
        controller = module.get(car_color_controller_1.CarColorController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=car-color.controller.spec.js.map