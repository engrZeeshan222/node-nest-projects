"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const color_service_1 = require("./color.service");
describe('ColorService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [color_service_1.ColorService],
        }).compile();
        service = module.get(color_service_1.ColorService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=color.service.spec.js.map