"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const user_settings_service_1 = require("./user-settings.service");
describe('UserSettingsService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [user_settings_service_1.UserSettingsService],
        }).compile();
        service = module.get(user_settings_service_1.UserSettingsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=user-settings.service.spec.js.map