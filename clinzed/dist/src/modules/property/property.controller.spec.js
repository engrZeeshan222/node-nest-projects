"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const property_controller_1 = require("./property.controller");
const property_service_1 = require("./property.service");
describe('PropertyController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [property_controller_1.PropertyController],
            providers: [property_service_1.PropertyService],
        }).compile();
        controller = module.get(property_controller_1.PropertyController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=property.controller.spec.js.map