"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const address_service_1 = require("./address.service");
describe('AddressService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [address_service_1.AddressService],
        }).compile();
        service = module.get(address_service_1.AddressService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=address.service.spec.js.map