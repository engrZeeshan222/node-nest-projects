"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const year_charger_type_controller_1 = require("./year-charger-type.controller");
const year_charger_type_service_1 = require("./year-charger-type.service");
describe('YearChargerTypeController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [year_charger_type_controller_1.YearChargerTypeController],
            providers: [year_charger_type_service_1.YearChargerTypeService],
        }).compile();
        controller = module.get(year_charger_type_controller_1.YearChargerTypeController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=year-charger-type.controller.spec.js.map