"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const property_service_1 = require("./property.service");
describe('PropertyService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [property_service_1.PropertyService],
        }).compile();
        service = module.get(property_service_1.PropertyService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=property.service.spec.js.map