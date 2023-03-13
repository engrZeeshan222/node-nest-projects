"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const car_color_service_1 = require("./car-color.service");
describe('CarColorService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [car_color_service_1.CarColorService],
        }).compile();
        service = module.get(car_color_service_1.CarColorService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=car-color.service.spec.js.map