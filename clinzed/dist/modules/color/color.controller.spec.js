"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const color_controller_1 = require("./color.controller");
const color_service_1 = require("./color.service");
describe('ColorController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [color_controller_1.ColorController],
            providers: [color_service_1.ColorService],
        }).compile();
        controller = module.get(color_controller_1.ColorController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=color.controller.spec.js.map