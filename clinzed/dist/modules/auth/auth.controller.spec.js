"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
describe('AuthController', () => {
    let authcontroller;
    let mockAuthService;
    beforeEach(async () => {
        const moduleRef = await testing_1.Test.createTestingModule({
            controllers: [auth_controller_1.AuthController],
            providers: [{
                    provide: auth_service_1.AuthService,
                    useValue: {
                        login: jest.fn(),
                        create: jest.fn(),
                        google: jest.fn(),
                        acebook: jest.fn(),
                        verifyAccount: jest.fn(),
                        forgotPassword: jest.fn(),
                        resetPassword: jest.fn()
                    }
                }],
        }).compile();
        authcontroller = moduleRef.get(auth_controller_1.AuthController);
        mockAuthService = moduleRef.get(auth_service_1.AuthService);
    });
    describe(('Constructor'), () => { });
    test('should be defined', () => {
        expect(authcontroller).toBeDefined();
    });
});
//# sourceMappingURL=auth.controller.spec.js.map