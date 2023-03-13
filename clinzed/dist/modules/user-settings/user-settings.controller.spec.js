"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const user_settings_controller_1 = require("./user-settings.controller");
const user_settings_service_1 = require("./user-settings.service");
describe('UserSettingsController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [user_settings_controller_1.UserSettingsController],
            providers: [user_settings_service_1.UserSettingsService],
        }).compile();
        controller = module.get(user_settings_controller_1.UserSettingsController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=user-settings.controller.spec.js.map