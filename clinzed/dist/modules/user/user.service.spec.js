"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const user_service_1 = require("./user.service");
describe('UserService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [user_service_1.UsersService],
        }).compile();
        service = module.get(user_service_1.UsersService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=user.service.spec.js.map