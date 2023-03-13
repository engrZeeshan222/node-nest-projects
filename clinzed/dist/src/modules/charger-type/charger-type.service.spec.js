"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const charger_type_service_1 = require("./charger-type.service");
describe('ChargerTypeService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [charger_type_service_1.ChargerTypeService],
        }).compile();
        service = module.get(charger_type_service_1.ChargerTypeService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=charger-type.service.spec.js.map