"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const charger_property_controller_1 = require("./charger-property.controller");
const charger_property_service_1 = require("./charger-property.service");
describe('ChargerPropertyController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [charger_property_controller_1.ChargerPropertyController],
            providers: [charger_property_service_1.ChargerPropertyService],
        }).compile();
        controller = module.get(charger_property_controller_1.ChargerPropertyController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=charger-property.controller.spec.js.map