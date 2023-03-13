"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const car_model_controller_1 = require("./car-model.controller");
const car_model_service_1 = require("./car-model.service");
describe('CarModelController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [car_model_controller_1.CarModelController],
            providers: [car_model_service_1.CarModelService],
        }).compile();
        controller = module.get(car_model_controller_1.CarModelController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=car-model.controller.spec.js.map