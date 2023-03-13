"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const photo_service_1 = require("./photo.service");
describe('PhotoService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [photo_service_1.PhotoService],
        }).compile();
        service = module.get(photo_service_1.PhotoService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=photo.service.spec.js.map