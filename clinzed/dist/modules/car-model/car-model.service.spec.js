"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const car_model_service_1 = require("./car-model.service");
describe('CarModelService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [car_model_service_1.CarModelService],
        }).compile();
        service = module.get(car_model_service_1.CarModelService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=car-model.service.spec.js.map