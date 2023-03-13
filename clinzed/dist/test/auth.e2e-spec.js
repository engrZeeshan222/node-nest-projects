"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const request = require("supertest");
const auth_module_1 = require("../src/modules/auth/auth.module");
const user_service_1 = require("../src/modules/user/user.service");
const mail_1 = require("@sendgrid/mail");
const jwt_1 = require("@nestjs/jwt");
describe('AuthController (e2e)', () => {
    let app;
    const mockUsersService = {};
    const mockJwtService = {};
    const mockMailService = {};
    beforeAll(async () => {
        const moduleRef = await testing_1.Test.createTestingModule({
            imports: [auth_module_1.AuthModule],
        })
            .overrideProvider(user_service_1.UsersService).useValue(mockUsersService)
            .overrideProvider(jwt_1.JwtService).useValue(mockJwtService)
            .overrideProvider(mail_1.MailService).useValue(mockMailService)
            .compile();
        app = moduleRef.createNestApplication();
        app.setGlobalPrefix('api/v1');
        await app.init();
    });
    afterAll(async () => {
        await app.close();
    });
    describe('ApiEndPoints', async () => {
        it.only('/auth/login', async () => {
            const loginUserToSend = {
                "email": "tubazaidi44@gmail.com",
                "password": "12345",
                "isHost": true
            };
            const res = await request(app.getHttpServer())
                .post('api/v1/auth/login')
                .send(loginUserToSend);
            expect(res).toBe(200);
        });
        it('/auth/signup', () => {
            return request(app.getHttpServer())
                .post('/auth/signup')
                .send({})
                .expect(200)
                .expect('Hello World!');
        });
        it('/auth/google', () => {
            return request(app.getHttpServer())
                .post('/auth/google')
                .send({})
                .expect(200)
                .expect('Hello World!');
        });
        it('/auth/facebook', () => {
            return request(app.getHttpServer())
                .post('/auth/facebook')
                .send({})
                .expect(200)
                .expect('Hello World!');
        });
        it('/auth/varify', () => {
            return request(app.getHttpServer())
                .get('/auth/varify')
                .send({})
                .expect(200)
                .expect('Hello World!');
        });
        it('/auth/forgot-password', () => {
            return request(app.getHttpServer())
                .post('/auth/forgot-password')
                .send({})
                .expect(200)
                .expect('Hello World!');
        });
        it('/auth/reset-password/:token', () => {
            return request(app.getHttpServer())
                .patch('/auth/reset-password/:token')
                .send({})
                .expect(200)
                .expect('Hello World!');
        });
    });
});
//# sourceMappingURL=auth.e2e-spec.js.map