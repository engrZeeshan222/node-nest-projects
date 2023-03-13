"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const year_charger_type_service_1 = require("./year-charger-type.service");
describe('YearChargerTypeService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [year_charger_type_service_1.YearChargerTypeService],
        }).compile();
        service = module.get(year_charger_type_service_1.YearChargerTypeService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=year-charger-type.service.spec.js.map