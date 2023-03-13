"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const charger_property_service_1 = require("./charger-property.service");
describe('ChargerPropertyService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [charger_property_service_1.ChargerPropertyService],
        }).compile();
        service = module.get(charger_property_service_1.ChargerPropertyService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=charger-property.service.spec.js.map