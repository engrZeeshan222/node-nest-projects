"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const address_controller_1 = require("./address.controller");
const address_service_1 = require("./address.service");
describe('AddressController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [address_controller_1.AddressController],
            providers: [address_service_1.AddressService],
        }).compile();
        controller = module.get(address_controller_1.AddressController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=address.controller.spec.js.map