"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const charger_type_controller_1 = require("./charger-type.controller");
const charger_type_service_1 = require("./charger-type.service");
describe('ChargerTypeController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [charger_type_controller_1.ChargerTypeController],
            providers: [charger_type_service_1.ChargerTypeService],
        }).compile();
        controller = module.get(charger_type_controller_1.ChargerTypeController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=charger-type.controller.spec.js.map