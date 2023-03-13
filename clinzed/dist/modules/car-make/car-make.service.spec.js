"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const car_make_service_1 = require("./car-make.service");
describe('CarMakeService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [car_make_service_1.CarMakeService],
        }).compile();
        service = module.get(car_make_service_1.CarMakeService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=car-make.service.spec.js.map