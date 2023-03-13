"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const photo_controller_1 = require("./photo.controller");
const photo_service_1 = require("./photo.service");
describe('PhotoController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [photo_controller_1.PhotoController],
            providers: [photo_service_1.PhotoService],
        }).compile();
        controller = module.get(photo_controller_1.PhotoController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=photo.controller.spec.js.map