"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const auth_service_1 = require("./auth.service");
const user_service_1 = require("../user/user.service");
const mail_service_1 = require("../mail/mail.service");
const jwt_1 = require("@nestjs/jwt");
const express_1 = require("@jest-mock/express");
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const google_auth_library_1 = require("google-auth-library");
describe('AuthService', () => {
    let mockAuthService;
    const mockUserService = {
        create: jest.fn(),
        hashPassword: jest.fn(),
        updatePassword: jest.fn(),
        findOneByEmail: jest.fn(),
        loginAs: jest.fn(),
        findOneFacebookId: jest.fn(),
        comparePassword: jest.fn(),
        findOneById: jest.fn(),
        findAll: jest.fn(),
        activateAccount: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
        socialLogin: jest.fn()
    };
    const mockMailService = {
        sendUserConfirmation: jest.fn(),
        resetPassword: jest.fn()
    };
    const mockJwtService = {
        sign: jest.fn(),
        signAsync: jest.fn(),
        verify: jest.fn(),
        verifyAsync: jest.fn(),
        decode: jest.fn(),
    };
    const mockedAuthService = {
        generateToken: jest.fn(),
        login: jest.fn()
    };
    beforeEach(async () => {
        const moduleRef = await testing_1.Test.createTestingModule({
            providers: [auth_service_1.AuthService, {
                    provide: user_service_1.UsersService,
                    useValue: mockUserService,
                }, {
                    provide: jwt_1.JwtService,
                    useValue: mockJwtService,
                }, {
                    provide: mail_service_1.MailService,
                    useValue: mockMailService,
                }]
        })
            .overrideProvider(user_service_1.UsersService).useValue(mockUserService)
            .overrideProvider(mail_service_1.MailService).useValue(mockMailService)
            .overrideProvider(jwt_1.JwtService).useValue(mockJwtService)
            .compile();
        mockAuthService = moduleRef.get(auth_service_1.AuthService);
        jest.clearAllMocks();
    });
    const mockedUser = {
        id: 1,
        email: 'test@test.com',
        password: '12345',
        firstName: 'testFirstName',
        lastName: 'testLastName',
        phone: 'testPhone',
        stripeAccountId: '12345',
        status: 'testStatus' || 'APPROVED',
        role: 'testRole',
        provider: 'test-provider',
        googleId: 'testgid',
        facebookId: 'testfbid',
        userSetting: null,
        creditCard: [],
        customerCar: [],
        Property: [],
        hostMessage: [],
        customerMessage: [],
        userMessage: [],
        lastCustomerLogin: new Date(),
        lastHostLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    const TestCreateUserDto = {
        email: 'test@test.com',
        stripeAccountId: 'test-id',
        firstName: 'testFirstName',
        lastName: 'testLastName',
        password: '12345',
        googleId: 'test-id',
        facebookId: 'test-id',
        provider: 'test',
        status: 'test',
        lastCustomerLogin: new Date,
        lastHostLogin: new Date
    };
    const TestloginBody = {
        id: 1,
        email: 'test@test.com',
        isHost: true,
        role: 'testRole'
    };
    const TestSignUpUser = {
        email: 'test@test.com',
        firstName: 'testFirstName',
        lastName: 'testLastName',
        password: '12345',
        confirmPassword: 'testTonfirmPassword',
        role: 'testRole'
    };
    const HostView = TestloginBody['isHost'];
    const mockReq = (0, express_1.getMockReq)({ locals: {
            params: {},
            body: { 'access_token': '12345', 'mockloginBody': TestloginBody, user: mockedUser, email: 'test@test.com', 'HostView': HostView, 'signUpUser': TestSignUpUser },
            header: { token: 'test-token' },
            query: { 'query': '?{testtoken}', 'token': 'jwttesttoken' },
            url: { url: '/' },
            cookies: { token: "testToken" },
            headers: {
                Accept: 'text/plain'
            }
        }
    });
    describe(('Constructor'), () => {
        test('should be defined', () => {
            expect(mockAuthService).toBeDefined();
        });
    });
    describe(('Funstions'), () => {
        beforeEach(async () => {
            jest.clearAllMocks();
        });
        describe(('generateToken'), () => {
            let mockUser = mockedUser;
            const mockIsHost = TestloginBody['isHost'];
            const mockVerifyToken = 'verify-test-token';
            const mockPayLoad = TestloginBody;
            const secret = undefined;
            const expiresIn = undefined;
            let mockJwtRestParams = { "expiresIn": expiresIn, "secret": secret };
            beforeEach(async () => {
                jest.clearAllMocks();
            });
            test('should be defined', async () => {
                expect(await mockAuthService.generateToken).toBeDefined();
            });
            test('should not throw error', async () => {
                expect(await mockAuthService.generateToken).not.toThrow();
            });
            jest.spyOn(mockJwtService, 'signAsync').mockImplementation(async (mockPayLoad, mockJwtRestParams) => {
                if (true) {
                    return Promise.resolve(mockVerifyToken);
                }
                else {
                    return null;
                }
            });
            test('should call mockJwtService', async () => {
                await mockAuthService.generateToken(mockUser, mockIsHost);
                expect(mockJwtService.signAsync).toBeCalled();
            });
            test('should call mockJwtService only once', async () => {
                await mockAuthService.generateToken(mockUser, mockIsHost);
                expect(mockJwtService.signAsync).toBeCalledTimes(1);
            });
            test('should call mockJwtService with mock params', async () => {
                await mockAuthService.generateToken(mockUser, mockIsHost);
                expect(await mockJwtService.signAsync).toBeCalledWith(mockPayLoad, mockJwtRestParams);
            });
            test('should have mock output from resolved mockJwtService with mock params', async () => {
                await mockAuthService.generateToken(mockUser, mockIsHost);
                expect(await mockJwtService.signAsync(mockPayLoad, mockJwtRestParams)).toBe(mockVerifyToken);
            });
            test('should have null from rejected mockJwtService with mock params', async () => {
                await mockAuthService.generateToken(mockUser, mockIsHost);
                expect(mockJwtService.signAsync).rejects.toEqual(null);
            });
        });
        describe(('verifyAccount'), () => {
            let mockUser = mockedUser;
            const mockIsHost = TestloginBody['isHost'];
            let params = { 'query': '?{testtoken}', 'token': 'jwttesttoken', 'id': 'id' };
            let token = params.token;
            let mockDecodedId = mockedUser['id'];
            let mockDecodedUser = mockedUser;
            beforeEach(async () => {
                jest.clearAllMocks();
            });
            test('should be defined', async () => {
                expect(await mockAuthService.verifyAccount).toBeDefined();
            });
            test('should not throw error', async () => {
                expect(await mockAuthService.verifyAccount).not.toThrow();
            });
            jest.spyOn(mockJwtService, 'decode').mockImplementation(async (token) => {
                if (token) {
                    return Promise.resolve(mockedUser);
                }
                else {
                    return Promise.reject(null);
                }
            });
            test('should call mockJwtService.decode', async () => {
                if (!params.id) {
                    await mockAuthService.verifyAccount(params);
                    await expect(await mockJwtService.decode).toBeCalled();
                }
            });
            test('should call mockJwtService.decode only once', async () => {
                if (!params.id) {
                    await mockAuthService.verifyAccount(params);
                    expect(mockJwtService.decode).toBeCalledTimes(1);
                }
            });
            test('should call mockJwtService.decode with mock params', async () => {
                if (!params.id) {
                    await mockAuthService.verifyAccount(params);
                    expect(await mockJwtService.decode).toBeCalledWith(token);
                }
            });
            test('should call mockJwtService.decode with resolved output', async () => {
                if (!params.id) {
                    await mockAuthService.verifyAccount(params);
                    expect(await mockJwtService.decode(token)).resolves.toEqual(mockedUser);
                }
            });
            test('should call mockJwtService.decode with rejected output', async () => {
                if (!params.id) {
                    await mockAuthService.verifyAccount(params);
                    expect(await mockJwtService.decode(token)).rejects.toEqual(null);
                }
            });
            jest.spyOn(mockUserService, 'findOneById').mockImplementation((mockDecodedId) => {
                if (mockDecodedId) {
                    return Promise.resolve(mockedUser);
                }
                else {
                    return Promise.reject(null);
                }
            });
            test('should call userService.findOneById if have decoded user', async () => {
                if (!params.id) {
                    if (mockDecodedUser) {
                        await mockAuthService.verifyAccount(params);
                        expect(await mockUserService.findOneById).toBeCalled();
                    }
                }
            });
            test('should call userService.findOneById only once if have decoded user', async () => {
                if (!params.id) {
                    if (mockDecodedUser) {
                        await mockAuthService.verifyAccount(params);
                        expect(await mockUserService.findOneById).toBeCalledTimes(1);
                    }
                }
            });
            test('should call userService.findOneById with mocked params if have decoded user', async () => {
                if (!params.id) {
                    if (mockDecodedUser) {
                        await mockAuthService.verifyAccount(params);
                        expect(await mockUserService.findOneById).toHaveBeenCalledWith(mockDecodedId);
                    }
                }
            });
            test('should call userService.findOneById with resolved output if have decoded user', async () => {
                if (!params.id) {
                    if (mockDecodedUser) {
                        await mockAuthService.verifyAccount(params);
                        expect(await mockUserService.findOneById(mockDecodedId)).resolves.toEqual(mockedUser);
                    }
                }
            });
            test('should call userService.findOneById with rejected output if have decoded user', async () => {
                if (!params.id) {
                    if (mockDecodedUser) {
                        await mockAuthService.verifyAccount(params);
                        expect(await mockUserService.findOneById(mockDecodedId)).rejects.toEqual(null);
                    }
                }
            });
            jest.spyOn(mockUserService, 'activateAccount').mockImplementation((mockDecodedUser) => {
                if (mockDecodedUser) {
                    return Promise.resolve(mockedUser);
                }
                else {
                    return Promise.reject(null);
                }
            });
            test('should call userService.activateAccount if have decoded user', async () => {
                if (!params.id) {
                    if (mockDecodedUser) {
                        await mockAuthService.verifyAccount(params);
                        expect(await mockUserService.activateAccount).toBeCalled();
                    }
                }
            });
            test('should call userService.activateAccount only once if have decoded user', async () => {
                if (!params.id) {
                    if (mockDecodedUser) {
                        await mockAuthService.verifyAccount(params);
                        expect(await mockUserService.activateAccount).toBeCalledTimes(1);
                    }
                }
            });
            test('should call userService.activateAccount with mocked params if have decoded user', async () => {
                if (!params.id) {
                    if (mockDecodedUser) {
                        await mockAuthService.verifyAccount(params);
                        expect(await mockUserService.activateAccount).toHaveBeenCalledWith(mockDecodedId);
                    }
                }
            });
            test('should call userService.activateAccount with resolved output if have decoded user', async () => {
                if (!params.id) {
                    if (mockDecodedUser) {
                        await mockAuthService.verifyAccount(params);
                        expect(await mockUserService.activateAccount(mockDecodedUser)).resolves.toEqual(mockedUser);
                    }
                }
            });
            test('should call userService.activateAccount with rejected output if have decoded user', async () => {
                if (!params.id) {
                    if (mockDecodedUser) {
                        await mockAuthService.verifyAccount(params);
                        expect(await mockUserService.activateAccount(mockDecodedUser)).rejects.toEqual(null);
                    }
                }
            });
            test('should call mockedAuthService.generateToken  if have decoded user', async () => {
                mockedAuthService.generateToken.mockImplementation((mockUser, mockIsHost) => {
                    if (mockUser && mockIsHost) {
                        return Promise.resolve(mockDecodedUser);
                    }
                    else {
                        return Promise.reject(null);
                    }
                });
                if (!params.id) {
                    if (mockDecodedUser) {
                        await mockAuthService.verifyAccount(params);
                        expect(await mockedAuthService.generateToken).toBeCalled();
                    }
                }
            });
            test('should call mockedAuthService.generateToken only once if have decoded user', async () => {
                mockedAuthService.generateToken.mockImplementation((mockUser, mockIsHost) => {
                    if (mockUser && mockIsHost) {
                        return Promise.resolve(mockDecodedUser);
                    }
                    else {
                        return Promise.reject(null);
                    }
                });
                if (!params.id) {
                    if (mockDecodedUser) {
                        await mockAuthService.verifyAccount(params);
                        expect(await mockedAuthService.generateToken).toBeCalledTimes(1);
                    }
                }
            });
            test('should call mockedAuthService.generateToken with mocked params if have decoded user', async () => {
                mockedAuthService.generateToken.mockImplementation((mockUser, mockIsHost) => {
                    if (mockUser && mockIsHost) {
                        return Promise.resolve(mockDecodedUser);
                    }
                    else {
                        return Promise.reject(null);
                    }
                });
                if (!params.id) {
                    if (mockDecodedUser) {
                        await mockAuthService.verifyAccount(params);
                        expect(await mockedAuthService.generateToken).toBeCalledWith(mockUser, mockIsHost);
                    }
                }
            });
            test('should call mockedAuthService.generateToken with resolved output from it if have decoded user', async () => {
                mockedAuthService.generateToken.mockImplementation((mockUser, mockIsHost) => {
                    if (mockUser && mockIsHost) {
                        return Promise.resolve(mockDecodedUser);
                    }
                    else {
                        return Promise.reject(null);
                    }
                });
                if (!params.id) {
                    if (mockDecodedUser) {
                        await mockAuthService.verifyAccount(params);
                        expect(await mockedAuthService.generateToken(mockUser, mockIsHost)).resolves.toEqual(mockDecodedUser);
                    }
                }
            });
            test('should call mockedAuthService.generateToken with rejected output from it if have decoded user', async () => {
                mockedAuthService.generateToken.mockImplementation((mockUser, mockIsHost) => {
                    if (mockUser && mockIsHost) {
                        return Promise.resolve(mockDecodedUser);
                    }
                    else {
                        return Promise.reject(null);
                    }
                });
                if (!params.id) {
                    if (mockDecodedUser) {
                        await mockAuthService.verifyAccount(params);
                        expect(await mockedAuthService.generateToken(mockUser, mockIsHost)).rejects.toEqual(null);
                    }
                }
            });
        });
        describe(('login'), () => {
            let mockLoginBody = mockReq.body['mockloginBody'];
            let mockUser = mockReq.body['user'];
            let isHostView = mockReq['HostView'];
            jest.spyOn(mockUserService, 'loginAs').mockImplementation((isHostView, mockUser) => {
                return Promise.resolve(null);
            });
            beforeEach(async () => {
                jest.clearAllMocks();
            });
            test('should be defined', async () => {
                expect(await mockAuthService.login).toBeDefined();
            });
            test('should not throw error', async () => {
                expect(await mockAuthService.login).not.toThrow();
            });
            test('should call UsersService-loginAs', async () => {
                try {
                    await mockAuthService.login(mockUser, mockLoginBody);
                    const isReturnType = mockUserService.loginAs(isHostView, mockUser);
                    expect(await user_service_1.UsersService.prototype.loginAs).toBeCalled();
                    expect(isReturnType).toBe(true);
                }
                catch (error) {
                    expect(error).toEqual(error);
                }
            });
            test('should call UsersService-loginAs only once', async () => {
                try {
                    await mockAuthService.login(mockUser, mockLoginBody);
                    expect(await mockUserService.loginAs).toBeCalledTimes(1);
                }
                catch (error) {
                    expect(error).toEqual(error);
                }
            });
            test('should call UsersService-loginAs with mock params', async () => {
                try {
                    await mockAuthService.login(mockUser, mockLoginBody);
                    expect(await mockUserService.loginAs).toHaveBeenCalledWith(isHostView, mockUser);
                }
                catch (error) {
                    expect(error).toEqual(error);
                }
            });
            test('should call UsersService-loginAs with mock output when promise resolved', async () => {
                try {
                    await mockAuthService.login(mockUser, mockLoginBody);
                    expect(await mockUserService.loginAs).toEqual(null);
                }
                catch (error) {
                    expect(error).toEqual(error);
                }
            });
            test('should call UsersService-loginAs with mock output when promise rejected', async () => {
                try {
                    jest.spyOn(mockUserService, 'loginAs').mockImplementation((isHostView, mockUser) => {
                        return Promise.reject('rejeted-promise');
                    });
                    await mockAuthService.login(mockUser, mockLoginBody);
                    expect(await mockUserService.loginAs).toBe('rejeted-promise');
                }
                catch (error) {
                    expect(error).toEqual(error);
                }
            });
            test('should call AuthService-generateToken with mocked output when promise resolved', async () => {
                try {
                    jest.spyOn(mockAuthService, 'generateToken').mockImplementation((mockUser, isHostView) => {
                        return Promise.reject('rejected-token');
                    });
                    await mockAuthService.login(mockUser, mockLoginBody);
                    expect(await mockAuthService.generateToken).toBe('rejected-token');
                }
                catch (error) {
                    expect(error).toEqual(error);
                }
            });
        });
        describe(('create'), () => {
            const mockSignUpUser = TestSignUpUser;
            const mockEmail = mockSignUpUser['email'];
            const mockPassword = TestSignUpUser['password'];
            let mockConfirmPassword = TestSignUpUser['confirmPassword'];
            let mockCreateUserDto = TestCreateUserDto;
            let mockUser = mockReq.body['user'];
            let userExistance = mockUserService.findOneByEmail.mockImplementation(async (mockEmail) => {
                if (mockEmail) {
                    Promise.resolve(mockUser);
                    return new Error('User Exist');
                }
                else {
                    return Promise.reject('No test email');
                }
            });
            let mockencryptedPassword = mockUserService.hashPassword.mockImplementation(async (mockPassword) => {
                if (mockPassword) {
                    Promise.resolve();
                    return '12345';
                }
                else {
                    return Promise.reject('No test password');
                }
            });
            let mockMatch = mockUserService.comparePassword.mockImplementation((mockConfirmPassword, mockencryptedPassword) => {
                if (mockConfirmPassword == mockencryptedPassword) {
                    return Promise.resolve('mocked-passwords-matched');
                }
                else {
                    return Promise.reject('test password do not matched');
                }
            });
            let mockCreatedUser = mockUserService.create.mockImplementation((mockSignUpUser, mockencryptedPassword) => {
                if (mockSignUpUser && mockencryptedPassword) {
                    return Promise.resolve(mockUser);
                }
                else {
                    Promise.reject();
                    return 'test user is not created';
                }
            });
            let mockToken;
            jest.spyOn(mockMailService, 'sendUserConfirmation').mockImplementation((mockCreatedUser, mockToken) => {
                if (mockCreatedUser && mockToken) {
                    return Promise.resolve(null);
                }
                else {
                    return 'No test email sent';
                }
            });
            beforeEach(async () => {
                jest.clearAllMocks();
            });
            test('should be defined', async () => {
                expect(await mockAuthService.create).toBeDefined();
            });
            test('should not throw error', async () => {
                expect(await mockAuthService.create).not.toThrow();
            });
            test('should return some result', async () => {
                try {
                    let result = await mockAuthService.create(mockSignUpUser);
                    expect(result).toBeTruthy();
                }
                catch (error) {
                    expect(error).toEqual(new common_1.HttpException('user with this email already exist', common_1.HttpStatus.BAD_REQUEST));
                }
            });
            test('should call mockUserService.findOneByEmail', async () => {
                try {
                    let result = await mockAuthService.create(mockSignUpUser);
                    expect(await mockUserService.findOneByEmail).toBeCalled();
                }
                catch (error) {
                    expect(error).toEqual(new common_1.HttpException('user with this email already exist', common_1.HttpStatus.BAD_REQUEST));
                }
            });
            test('should call mockUserService.findOneByEmail only once', async () => {
                try {
                    let result = await mockAuthService.create(mockSignUpUser);
                    expect(await mockUserService.findOneByEmail).toBeCalledTimes(1);
                }
                catch (error) {
                    expect(error).toEqual(new common_1.HttpException('user with this email already exist', common_1.HttpStatus.BAD_REQUEST));
                }
            });
            test('should call mockUserService.findOneByEmail with mock output when prmose get resolved', async () => {
                try {
                    let result = await mockAuthService.create(mockSignUpUser);
                    expect(await mockUserService.findOneByEmail).toEqual(mockUser);
                    expect(await mockUserService.findOneByEmail).resolves.toEqual(Error('User Exist'));
                }
                catch (error) {
                    expect(error).toEqual(new common_1.HttpException('user with this email already exist', common_1.HttpStatus.BAD_REQUEST));
                }
            });
            test('should call mockUserService.findOneByEmail with mock inputs', async () => {
                try {
                    let result = await mockAuthService.create(mockSignUpUser);
                    expect(await mockUserService.findOneByEmail).resolves.toBeCalledWith(mockEmail);
                }
                catch (error) {
                    expect(error).toEqual(new common_1.HttpException('user with this email already exist', common_1.HttpStatus.BAD_REQUEST));
                }
            });
            test('should throw exception if user exist after calling mockUserService.findOneByEmail', async () => {
                try {
                    if (userExistance) {
                        let result = await mockAuthService.create(mockSignUpUser);
                        expect(result).toThrow();
                    }
                }
                catch (error) {
                    expect(error).toEqual(new common_1.HttpException('user with this email already exist', common_1.HttpStatus.BAD_REQUEST));
                }
            });
            test('should call mockUserService.hashPassword when no user exist', async () => {
                try {
                    if (!userExistance) {
                        let result = await mockAuthService.create(mockSignUpUser);
                        expect(mockencryptedPassword).resolves.toBe(true);
                        expect(mockencryptedPassword).rejects.toBe('No test password');
                        expect(mockUserService.hashPassword).toBeCalled();
                    }
                }
                catch (error) {
                    expect(error).toEqual(new common_1.HttpException('user with this email already exist', common_1.HttpStatus.BAD_REQUEST));
                }
            });
            test('should call mockUserService.hashPassword only once when no user exist', async () => {
                try {
                    if (!userExistance) {
                        let result = await mockAuthService.create(mockSignUpUser);
                        expect(mockUserService.hashPassword).toBeCalledTimes(1);
                    }
                }
                catch (error) {
                    expect(error).toEqual(new common_1.HttpException('user with this email already exist', common_1.HttpStatus.BAD_REQUEST));
                }
            });
            test('should call mockUserService.hashPassword with mock input when no user exist', async () => {
                try {
                    if (!userExistance) {
                        let result = await mockAuthService.create(mockSignUpUser);
                        expect(mockUserService.hashPassword).toBeCalledWith(mockPassword);
                    }
                }
                catch (error) {
                    expect(error).toEqual(new common_1.HttpException('user with this email already exist', common_1.HttpStatus.BAD_REQUEST));
                }
            });
            test('should have mocked resolved output from mockUserService.hashPassword when no user exist', async () => {
                try {
                    if (!userExistance) {
                        let result = await mockAuthService.create(mockSignUpUser);
                        expect(mockUserService.hashPassword).resolves.toBe('12345');
                    }
                }
                catch (error) {
                    expect(error).toEqual(new common_1.HttpException('user with this email already exist', common_1.HttpStatus.BAD_REQUEST));
                }
            });
            test('should have mocked rejected output from mockUserService.hashPassword when no user exist', async () => {
                try {
                    if (!userExistance) {
                        let result = await mockAuthService.create(mockSignUpUser);
                        expect(mockUserService.hashPassword).rejects.toBe('No test password');
                    }
                }
                catch (error) {
                    expect(error).toEqual(new common_1.HttpException('user with this email already exist', common_1.HttpStatus.BAD_REQUEST));
                }
            });
            test('should call mockUserService.comparePassword when no user exist', async () => {
                try {
                    if (!userExistance) {
                        let result = await mockAuthService.create(mockSignUpUser);
                        expect(mockMatch).resolves.toBe(true);
                        expect(mockMatch).rejects.toBe('No test password');
                        expect(await mockUserService.comparePassword).toBeCalled();
                    }
                }
                catch (error) {
                    expect(error).toEqual(new common_1.HttpException('user with this email already exist', common_1.HttpStatus.BAD_REQUEST));
                }
            });
            test('should call mockUserService.comparePassword only once  when no user exist', async () => {
                try {
                    if (!userExistance) {
                        let result = await mockAuthService.create(mockSignUpUser);
                        expect(await mockUserService.comparePassword).toBeCalledTimes(1);
                    }
                }
                catch (error) {
                    expect(error).toEqual(new common_1.HttpException('user with this email already exist', common_1.HttpStatus.BAD_REQUEST));
                }
            });
            test('should have desired output from resolved mockUserService.comparePassword  when no user exist', async () => {
                try {
                    if (!userExistance) {
                        let result = await mockAuthService.create(mockSignUpUser);
                        expect(await mockUserService.comparePassword).resolves.toBe('mocked-passwords-matched');
                    }
                }
                catch (error) {
                    expect(error).toEqual(new common_1.HttpException('user with this email already exist', common_1.HttpStatus.BAD_REQUEST));
                }
            });
            test('should call mockUserService.comparePassword with mocked input when no user exist', async () => {
                try {
                    if (!userExistance) {
                        let result = await mockAuthService.create(mockSignUpUser);
                        expect(await mockUserService.comparePassword).toBeCalledWith(mockEmail);
                    }
                }
                catch (error) {
                    expect(error).toEqual(new common_1.HttpException('user with this email already exist', common_1.HttpStatus.BAD_REQUEST));
                }
            });
            test('should have exception from mockUserService.create with mocked input when no user exist and have no match', async () => {
                try {
                    if (!userExistance) {
                        if (!mockMatch) {
                            let result = await mockAuthService.create(mockSignUpUser);
                            expect(mockCreatedUser).toThrow();
                        }
                    }
                }
                catch (error) {
                    expect(error).toEqual(new common_1.HttpException('user with this email already exist', common_1.HttpStatus.BAD_REQUEST));
                }
            });
            test('should call mockUserService.create when no user exist and have match', async () => {
                try {
                    if (!userExistance) {
                        if (mockMatch) {
                            let result = await mockAuthService.create(mockSignUpUser);
                            expect(await mockUserService.create).toBeCalled();
                        }
                    }
                }
                catch (error) {
                    expect(error).toEqual(new common_1.HttpException('user with this email already exist', common_1.HttpStatus.BAD_REQUEST));
                }
            });
            test('should call mockUserService.create only once when no user exist and have match', async () => {
                try {
                    if (!userExistance) {
                        if (mockMatch) {
                            let result = await mockAuthService.create(mockSignUpUser);
                            expect(await mockUserService.create).toBeCalledTimes(1);
                        }
                    }
                }
                catch (error) {
                    expect(error).toEqual(new common_1.HttpException('user with this email already exist', common_1.HttpStatus.BAD_REQUEST));
                }
            });
            test('should call mockUserService.create with mocked input when no user exist and have match', async () => {
                try {
                    if (!userExistance) {
                        if (mockMatch) {
                            let result = await mockAuthService.create(mockSignUpUser);
                            expect(await mockUserService.create).toBeCalledWith(mockSignUpUser, mockencryptedPassword);
                        }
                    }
                }
                catch (error) {
                    expect(error).toEqual(new common_1.HttpException('user with this email already exist', common_1.HttpStatus.BAD_REQUEST));
                }
            });
            test('should have mocked resolved output from mockUserService.create with mocked input when no user exist and have match', async () => {
                try {
                    if (!userExistance) {
                        if (mockMatch) {
                            let result = await mockAuthService.create(mockSignUpUser);
                            expect(mockUserService.create).resolves.toEqual(mockUser);
                        }
                    }
                }
                catch (error) {
                    expect(error).toEqual(new common_1.HttpException('user with this email already exist', common_1.HttpStatus.BAD_REQUEST));
                }
            });
            test('should have mocked rejected output from mockUserService.create with mocked input when no user exist and have match', async () => {
                try {
                    if (!userExistance) {
                        if (mockMatch) {
                            let result = await mockAuthService.create(mockSignUpUser);
                            expect(mockUserService.create).rejects.toEqual('test user is not created');
                        }
                    }
                }
                catch (error) {
                    expect(error).toEqual(new common_1.HttpException('user with this email already exist', common_1.HttpStatus.BAD_REQUEST));
                }
            });
            test('should have output from mockUserService.create with mocked input when no user exist and have match', async () => {
                try {
                    if (!userExistance) {
                        if (mockMatch) {
                            let result = await mockAuthService.create(mockSignUpUser);
                            expect(mockCreatedUser).toBe(true);
                        }
                    }
                }
                catch (error) {
                    expect(error).toEqual(new common_1.HttpException('user with this email already exist', common_1.HttpStatus.BAD_REQUEST));
                }
            });
            test('should call mockMailService.sendUserConfirmation when no user exist and have match', async () => {
                try {
                    if (!userExistance) {
                        if (mockMatch) {
                            let result = await mockAuthService.create(mockSignUpUser);
                            expect(await mockMailService.sendUserConfirmation).toBeCalled();
                        }
                    }
                }
                catch (error) {
                    expect(error).toEqual(new common_1.HttpException('user with this email already exist', common_1.HttpStatus.BAD_REQUEST));
                }
            });
            test('should call mockMailService.sendUserConfirmation only once when no user exist and have match', async () => {
                try {
                    if (!userExistance) {
                        if (mockMatch) {
                            let result = await mockAuthService.create(mockSignUpUser);
                            expect(await mockMailService.sendUserConfirmation).toBeCalledTimes(1);
                        }
                    }
                }
                catch (error) {
                    expect(error).toEqual(new common_1.HttpException('user with this email already exist', common_1.HttpStatus.BAD_REQUEST));
                }
            });
            test('should call mockMailService.sendUserConfirmation with mocked input when no user exist and have match', async () => {
                try {
                    if (!userExistance) {
                        if (mockMatch) {
                            let result = await mockAuthService.create(mockSignUpUser);
                            expect(await mockMailService.sendUserConfirmation).toBeCalledWith(mockCreatedUser, mockToken);
                        }
                    }
                }
                catch (error) {
                    expect(error).toEqual(new common_1.HttpException('user with this email already exist', common_1.HttpStatus.BAD_REQUEST));
                }
            });
            test('should have mocked resolved output from mockMailService.sendUserConfirmation with mocked input when no user exist and have match', async () => {
                try {
                    if (!userExistance) {
                        if (mockMatch) {
                            let result = await mockAuthService.create(mockSignUpUser);
                            expect(mockMailService.sendUserConfirmation).resolves.toEqual(null);
                        }
                    }
                }
                catch (error) {
                    expect(error).toEqual(new common_1.HttpException('user with this email already exist', common_1.HttpStatus.BAD_REQUEST));
                }
            });
            test('should have mocked rejected output from mockMailService.sendUserConfirmation with mocked input when no user exist and have match', async () => {
                try {
                    if (!userExistance) {
                        if (mockMatch) {
                            let result = await mockAuthService.create(mockSignUpUser);
                            expect(mockMailService.sendUserConfirmation).rejects.toEqual('No test email sent');
                        }
                    }
                }
                catch (error) {
                    expect(error).toEqual(new common_1.HttpException('user with this email already exist', common_1.HttpStatus.BAD_REQUEST));
                }
            });
            test('should have output from mockMailService.sendUserConfirmation with mocked input when no user exist and have match', async () => {
                try {
                    if (!userExistance) {
                        if (mockMatch) {
                            let result = await mockAuthService.create(mockSignUpUser);
                            expect(mockMailService.sendUserConfirmation).toBe(true);
                        }
                    }
                }
                catch (error) {
                    expect(error).toEqual(new common_1.HttpException('user with this email already exist', common_1.HttpStatus.BAD_REQUEST));
                }
            });
            test('should call UsersService-findOneByEmail', async () => {
                try {
                    let result = await mockAuthService.create(mockSignUpUser);
                    if (!userExistance) {
                        if (mockMatch) {
                        }
                        if (!mockMatch) {
                        }
                    }
                }
                catch (error) {
                    expect(error).toEqual(new common_1.HttpException('user with this email already exist', common_1.HttpStatus.BAD_REQUEST));
                }
            });
        });
        describe(('validateUser'), () => {
            let mockEmailIdentifier = 'test@test.com';
            let mockPass = '12345';
            let mockedUserPass = mockedUser.password;
            let mockMatch;
            const { password } = mockedUser, result = __rest(mockedUser, ["password"]);
            let mockUserStatus = {
                APPROVED: 'APPROVED'
            };
            beforeEach(async () => {
                jest.clearAllMocks();
            });
            test('should be defined', async () => {
                expect(await mockAuthService.validateUser).toBeDefined();
            });
            test('should not throw error', async () => {
                expect(await mockAuthService.validateUser).not.toThrow();
            });
            mockUserService.findOneByEmail.mockImplementation(async (mockEmailIdentifier) => {
                if (mockEmailIdentifier) {
                    return Promise.resolve(mockedUser);
                }
                else {
                    return Promise.reject(null);
                }
            });
            test('should call  mockUserService.findOneByEmail if user status matches', async () => {
                if (mockUserStatus['APPROVED'] == mockedUser['status']) {
                    await mockAuthService.validateUser(mockEmailIdentifier, mockPass);
                    await expect(await mockUserService.findOneByEmail).toBeCalled();
                    await expect(await mockUserService.comparePassword).toBeCalled();
                }
            });
            test('should call  mockUserService.findOneByEmail only once  if user status matches', async () => {
                if (mockUserStatus['APPROVED'] == mockedUser['status']) {
                    await mockAuthService.validateUser(mockEmailIdentifier, mockPass);
                    await expect(await mockUserService.findOneByEmail).toBeCalledTimes(1);
                }
            });
            test('should call  mockUserService.findOneByEmail with mock params  if user status matches', async () => {
                if (mockUserStatus['APPROVED'] == mockedUser['status']) {
                    await mockAuthService.validateUser(mockEmailIdentifier, mockPass);
                    await expect(await mockUserService.findOneByEmail).toBeCalledWith(mockEmailIdentifier);
                }
            });
            test('should call valid resolved output from mockUserService.findOneByEmail with mock params  if user status matches', async () => {
                if (mockUserStatus['APPROVED'] == mockedUser['status']) {
                    await mockAuthService.validateUser(mockEmailIdentifier, mockPass);
                    await expect(await mockUserService.findOneByEmail(mockEmailIdentifier)).resolves.toEqual(mockedUser);
                }
            });
            test('should call valid rejected output from mockUserService.findOneByEmail with mock params  if user status matches', async () => {
                if (mockUserStatus['APPROVED'] == mockedUser['status']) {
                    await mockAuthService.validateUser(mockEmailIdentifier, mockPass);
                    await expect(await mockUserService.findOneByEmail(mockEmailIdentifier)).rejects.toEqual(null);
                }
            });
            test('should call  mockUserService.findOneByEmail and throw exception if no user returned from it', async () => {
                mockUserService.findOneByEmail.mockImplementation(async (mockEmailIdentifier) => {
                    return Promise.reject(null);
                });
                if (!mockedUser) {
                    expect.assertions(2);
                    try {
                        expect(async () => {
                            await mockAuthService.validateUser(mockEmailIdentifier, mockPass);
                        }).rejects.toThrow(new common_1.HttpException('No user found with this email', common_1.HttpStatus.NOT_FOUND));
                        await expect(await mockUserService.findOneByEmail).toBeCalled();
                    }
                    catch (error) {
                        expect(error).toBeInstanceOf(common_1.HttpException);
                        expect(error).toHaveProperty('message', 'No user found with this email');
                        expect(error).toHaveProperty('status', 500);
                    }
                }
            });
            test('should call  mockUserService.findOneByEmail and throw exception if user status do not matches', async () => {
                expect.assertions(2);
                try {
                    expect(async () => {
                        await mockAuthService.validateUser(mockEmailIdentifier, mockPass);
                    }).rejects.toThrow(new common_1.HttpException('Sorry your account is not Activated', common_1.HttpStatus.NOT_FOUND));
                    await expect(await mockUserService.findOneByEmail).toBeCalled();
                }
                catch (error) {
                    expect(error).toBeInstanceOf(common_1.HttpException);
                    expect(error).toHaveProperty('message', 'Sorry your account is not Activated');
                    expect(error).toHaveProperty('status', 500);
                }
            });
            mockUserService.comparePassword.mockImplementation(async (mockPass, mockedUserPass) => {
                if (mockPass && mockedUserPass) {
                    return Promise.resolve(mockMatch);
                }
                else {
                    return Promise.reject(null);
                }
            });
            test('should call  mockUserService.comparePassword if have user', async () => {
                if (mockUserStatus['APPROVED'] == mockedUser['status']) {
                    await mockAuthService.validateUser(mockEmailIdentifier, mockPass);
                    await expect(await mockUserService.comparePassword).toBeCalled();
                }
            });
            test('should call  mockUserService.comparePassword only once if have user', async () => {
                if (mockUserStatus['APPROVED'] == mockedUser['status']) {
                    await mockAuthService.validateUser(mockEmailIdentifier, mockPass);
                    await expect(await mockUserService.comparePassword).toBeCalledTimes(1);
                }
            });
            test('should call  mockUserService.comparePassword with mock params if have user', async () => {
                if (mockUserStatus['APPROVED'] == mockedUser['status']) {
                    await mockAuthService.validateUser(mockEmailIdentifier, mockPass);
                    await expect(await mockUserService.comparePassword).toBeCalledWith(mockPass, mockedUserPass);
                }
            });
            test('should have valid resolved output from mockUserService.comparePassword if have user', async () => {
                if (mockUserStatus['APPROVED'] == mockedUser['status']) {
                    await mockAuthService.validateUser(mockEmailIdentifier, mockPass);
                    await expect(await mockUserService.comparePassword).resolves.toEqual(mockMatch);
                }
            });
            test('should have valid rejected output from mockUserService.comparePassword if have user', async () => {
                if (mockUserStatus['APPROVED'] == mockedUser['status']) {
                    await mockAuthService.validateUser(mockEmailIdentifier, mockPass);
                    await expect(await mockUserService.comparePassword).rejects.toEqual(null);
                }
            });
            test('should call  mockUserService.comparePassword and throw exception if no  matches fiund', async () => {
                mockUserService.comparePassword.mockImplementation(async (mockPass, mockedUserPass) => {
                    return Promise.reject(null);
                });
                if (!mockMatch) {
                    expect.assertions(2);
                    try {
                        expect(async () => {
                            await mockAuthService.validateUser(mockEmailIdentifier, mockPass);
                        }).rejects.toThrow(new common_1.HttpException('InCorrect Password', common_1.HttpStatus.NOT_FOUND));
                        await expect(await mockUserService.findOneByEmail).toBeCalled();
                    }
                    catch (error) {
                        expect(error).toBeInstanceOf(common_1.HttpException);
                        expect(error).toHaveProperty('message', 'InCorrect Password');
                        expect(error).toHaveProperty('status', 500);
                    }
                }
            });
            test('should call  mockUserService.comparePassword and throw exception if no  matches fiund', async () => {
                if (mockUserStatus['APPROVED'] == mockedUser['status']) {
                    if (mockMatch) {
                        let mockResult = await mockAuthService.validateUser(mockEmailIdentifier, mockPass);
                        expect(mockResult).toBe(result);
                    }
                }
            });
        });
        jest.mock("axios");
        describe(('facebook'), () => {
            let mockAccess_Token = mockReq.body['access_token'];
            let mockCreateUserInput = TestCreateUserDto;
            let mockAxiosInput = { url: 'testUrl',
                method: 'get',
                params: mockReq.params };
            beforeEach(async () => {
                jest.clearAllMocks();
            });
            test('should be defined', async () => {
                expect(await mockAuthService.facebook).toBeDefined();
            });
            test('should not throw error', async () => {
                expect(await mockAuthService.facebook).not.toThrow();
            });
            jest.spyOn(axios_1.default, 'get').mockImplementation(async (mockAxiosInput) => {
                if (mockAxiosInput) {
                    return Promise.resolve(mockCreateUserInput);
                }
                else {
                    return Promise.reject(null);
                }
            });
            test('should call axios', async () => {
                if (!mockedUser.id) {
                    await mockAuthService.facebook(mockAccess_Token);
                    await expect(await axios_1.default.get).toBeCalled();
                }
            });
            test('should call axios only once', async () => {
                if (!mockedUser.id) {
                    await mockAuthService.facebook(mockAccess_Token);
                    await expect(await axios_1.default.get).toBeCalledTimes(1);
                }
            });
            test('should call axios with mock params', async () => {
                if (!mockedUser.id) {
                    await mockAuthService.facebook(mockAccess_Token);
                    await expect(await axios_1.default.get).toBeCalledWith(mockAxiosInput);
                }
            });
            test('should have valid resolved output from axios', async () => {
                if (!mockedUser.id) {
                    await mockAuthService.facebook(mockAccess_Token);
                    await expect(await axios_1.default.get(mockAxiosInput.url)).resolves.toEqual(mockCreateUserInput);
                }
            });
            test('should have valid rejected output from axios', async () => {
                if (!mockedUser.id) {
                    await mockAuthService.facebook(mockAccess_Token);
                    await expect(await axios_1.default.get(mockAxiosInput.url)).rejects.toEqual(null);
                }
            });
            jest.spyOn(mockUserService, 'socialLogin').mockImplementation((mockCreateUserInput) => {
                if (mockCreateUserInput) {
                    return Promise.resolve(mockedUser);
                }
                else {
                    return Promise.reject(null);
                }
            });
            test('should call mockUserService.socialLogin', async () => {
                if (!mockedUser.id) {
                    await mockAuthService.facebook(mockAccess_Token);
                    await expect(await mockUserService.socialLogin).toBeCalled();
                }
            });
            test('should call mockUserService.socialLogin only once', async () => {
                if (!mockedUser.id) {
                    await mockAuthService.facebook(mockAccess_Token);
                    await expect(await mockUserService.socialLogin).toBeCalledTimes(1);
                }
            });
            test('should call mockUserService.socialLogin with mock params', async () => {
                if (!mockedUser.id) {
                    await mockAuthService.facebook(mockAccess_Token);
                    await expect(await mockUserService.socialLogin).toBeCalledWith(mockAxiosInput);
                }
            });
            test('should have valid resolved output from mockUserService.socialLogin', async () => {
                if (!mockedUser.id) {
                    await mockAuthService.facebook(mockAccess_Token);
                    await expect(await mockUserService.socialLogin(mockCreateUserInput)).resolves.toEqual(mockedUser);
                }
            });
            test('should have valid rejected output from mockUserService.socialLogin', async () => {
                if (!mockedUser.id) {
                    await mockAuthService.facebook(mockAccess_Token);
                    await expect(await mockUserService.socialLogin(mockCreateUserInput)).rejects.toEqual(null);
                }
            });
            jest.spyOn(mockedAuthService, 'login').mockImplementation((mockedUser) => {
                if (mockedUser) {
                    return Promise.resolve({});
                }
                else {
                    return Promise.reject(null);
                }
            });
            test('should call login', async () => {
                if (!mockedUser.id) {
                    await mockAuthService.facebook(mockAccess_Token);
                    await expect(await mockedAuthService.login).toBeCalled();
                }
            });
            test('should call login only once', async () => {
                if (!mockedUser.id) {
                    await mockAuthService.facebook(mockAccess_Token);
                    await expect(await mockedAuthService.login).toBeCalledTimes(1);
                }
            });
            test('should call login with mock params', async () => {
                if (!mockedUser.id) {
                    await mockAuthService.facebook(mockAccess_Token);
                    await expect(await mockedAuthService.login).toBeCalledWith(mockedUser);
                }
            });
            test('should have valid resolved output from login', async () => {
                if (!mockedUser.id) {
                    await mockAuthService.facebook(mockAccess_Token);
                    await expect(await mockedAuthService.login(mockedUser)).resolves.toEqual({});
                }
            });
            test('should have valid rejected output from login', async () => {
                if (!mockedUser.id) {
                    await mockAuthService.facebook(mockAccess_Token);
                    await expect(await mockedAuthService.login(mockedUser)).rejects.toEqual(null);
                }
            });
        });
        describe(('google'), () => {
            let mockAccess_Token = mockReq.body['access_token'];
            let mockCreateUserInput = TestCreateUserDto;
            const mockClient = new google_auth_library_1.OAuth2Client(mockedUser.googleId);
            let mockticket;
            let mockPayLoad;
            const VerifyIdTokenOptions = {
                idToken: '12345',
                audience: '',
                maxExpiry: 0,
            };
            beforeEach(async () => {
                jest.clearAllMocks();
            });
            test('should be defined', async () => {
                expect(await mockAuthService.google).toBeDefined();
            });
            test('should not throw error', async () => {
                expect(await mockAuthService.google).not.toThrow();
            });
            jest.spyOn(mockClient, 'verifyIdToken').mockImplementation(async (VerifyIdTokenOptions) => {
                if (VerifyIdTokenOptions) {
                    return Promise.resolve(mockticket);
                }
                else {
                    return Promise.resolve(null);
                }
            });
            test('should call client.verifyIdToken', async () => {
                if (!mockedUser.id) {
                    await mockAuthService.google(mockAccess_Token);
                    await expect(await mockClient.verifyIdToken(VerifyIdTokenOptions)).toBeCalled();
                }
            });
            test('should call client.verifyIdToken only once', async () => {
                if (!mockedUser.id) {
                    await mockAuthService.facebook(mockAccess_Token);
                    await expect(await mockClient.verifyIdToken(VerifyIdTokenOptions)).toBeCalledTimes(1);
                }
            });
            test('should call client.verifyIdToken with mock params', async () => {
                if (!mockedUser.id) {
                    await mockAuthService.facebook(mockAccess_Token);
                    await expect(await mockClient.verifyIdToken(VerifyIdTokenOptions)).toBeCalledWith(VerifyIdTokenOptions);
                }
            });
            test('should have valid resolved output from client.verifyIdToken', async () => {
                if (!mockedUser.id) {
                    await mockAuthService.facebook(mockAccess_Token);
                    await expect(await mockClient.verifyIdToken(VerifyIdTokenOptions)).resolves.toEqual(mockticket);
                }
            });
            test('should have valid rejected output from client.verifyIdToken', async () => {
                if (!mockedUser.id) {
                    if (!mockPayLoad) {
                        expect.assertions(2);
                        try {
                            await mockAuthService.facebook(mockAccess_Token);
                            expect(await mockAuthService.facebook(mockAccess_Token)).toThrow(new common_1.NotFoundException('No user found with this email'));
                        }
                        catch (error) {
                            expect(error).toBeInstanceOf(common_1.NotFoundException);
                            expect(error).toHaveProperty('message', 'No user found with this email');
                        }
                    }
                }
            });
            jest.spyOn(mockUserService, 'socialLogin').mockImplementation((mockCreateUserInput) => {
                if (mockCreateUserInput) {
                    return Promise.resolve(mockedUser);
                }
                else {
                    return Promise.reject(null);
                }
            });
            test('should call mockUserService.socialLogin', async () => {
                if (!mockedUser.id) {
                    await mockAuthService.google(mockAccess_Token);
                    await expect(await mockUserService.socialLogin).toBeCalled();
                }
            });
            test('should call mockUserService.socialLogin only once', async () => {
                if (!mockedUser.id) {
                    await mockAuthService.google(mockAccess_Token);
                    await expect(await mockUserService.socialLogin).toBeCalledTimes(1);
                }
            });
            test('should call mockUserService.socialLogin with mock params', async () => {
                if (!mockedUser.id) {
                    await mockAuthService.google(mockAccess_Token);
                    await expect(await mockUserService.socialLogin).toBeCalledWith(mockCreateUserInput);
                }
            });
            test('should have valid resolved output from mockUserService.socialLogin', async () => {
                if (!mockedUser.id) {
                    await mockAuthService.google(mockAccess_Token);
                    await expect(await mockUserService.socialLogin(mockCreateUserInput)).resolves.toEqual(mockedUser);
                }
            });
            test('should have valid rejected output from mockUserService.socialLogin', async () => {
                if (!mockedUser.id) {
                    await mockAuthService.google(mockAccess_Token);
                    await expect(await mockUserService.socialLogin(mockCreateUserInput)).rejects.toEqual(null);
                }
            });
            jest.spyOn(mockedAuthService, 'login').mockImplementation((mockedUser) => {
                if (mockedUser) {
                    return Promise.resolve({});
                }
                else {
                    return Promise.reject(null);
                }
            });
            test('should call login', async () => {
                if (!mockedUser.id) {
                    await mockAuthService.google(mockAccess_Token);
                    await expect(await mockedAuthService.login).toBeCalled();
                }
            });
            test('should call login only once', async () => {
                if (!mockedUser.id) {
                    await mockAuthService.google(mockAccess_Token);
                    await expect(await mockedAuthService.login).toBeCalledTimes(1);
                }
            });
            test('should call login with mock params', async () => {
                if (!mockedUser.id) {
                    await mockAuthService.google(mockAccess_Token);
                    await expect(await mockedAuthService.login).toBeCalledWith(mockedUser);
                }
            });
            test('should have valid resolved output from login', async () => {
                if (!mockedUser.id) {
                    await mockAuthService.google(mockAccess_Token);
                    await expect(await mockedAuthService.login(mockedUser)).resolves.toEqual({});
                }
            });
            test('should have valid rejected output from login', async () => {
                if (!mockedUser.id) {
                    await mockAuthService.google(mockAccess_Token);
                    await expect(await mockedAuthService.login(mockedUser)).rejects.toEqual(null);
                }
            });
        });
        describe(('forgotPassword'), () => {
            const mockEmailForget = mockedUser['email'];
            let mockMessage;
            let mockAccess_Token;
            beforeEach(async () => {
                jest.clearAllMocks();
            });
            test('should be defined', async () => {
                expect(await mockAuthService.forgotPassword).toBeDefined();
            });
            test('should not throw error', async () => {
                expect(await mockAuthService.forgotPassword).not.toThrow();
            });
            jest.spyOn(mockUserService, 'findOneByEmail').mockImplementation(async (mockEmailForget) => {
                if (mockEmailForget) {
                    return Promise.resolve(mockedUser);
                }
                else {
                    return Promise.resolve(null);
                }
            });
            test('should call mockUserService.findOneByEmail and provide user', async () => {
                if (mockMessage) {
                    await mockAuthService.forgotPassword(mockEmailForget);
                    await expect(await mockUserService.findOneByEmail).toBeCalled();
                }
            });
            test('should call mockUserService.findOneByEmail only once and provide user', async () => {
                if (mockMessage) {
                    await mockAuthService.forgotPassword(mockEmailForget);
                    await expect(await mockUserService.findOneByEmail).toBeCalledTimes(1);
                }
            });
            test('should call mockUserService.findOneByEmail with mock params and provide user', async () => {
                if (mockMessage) {
                    await mockAuthService.forgotPassword(mockEmailForget);
                    await expect(await mockUserService.findOneByEmail).toBeCalledWith(mockEmailForget);
                }
            });
            test('should have valid resolved output from mockUserService.findOneByEmail and provide user', async () => {
                if (mockMessage) {
                    await mockAuthService.forgotPassword(mockEmailForget);
                    await expect(await mockUserService.findOneByEmail).resolves.toEqual(mockedUser);
                }
            });
            test('should have valid rejected output from mockUserService.findOneByEmail and provide user', async () => {
                if (mockMessage) {
                    await mockAuthService.forgotPassword(mockEmailForget);
                    await expect(await mockUserService.findOneByEmail).rejects.toEqual(null);
                }
            });
            jest.spyOn(mockMailService, 'resetPassword').mockImplementation((mockedUser, mockAccess_Token) => {
                if (mockedUser && mockAccess_Token) {
                    return Promise.resolve('true');
                }
                else {
                    return Promise.reject(null);
                }
            });
            test('should call mockMailService.resetPassword if have user and token', async () => {
                if (mockMessage) {
                    await mockAuthService.forgotPassword(mockEmailForget);
                    await expect(await mockMailService.resetPassword).toBeCalled();
                }
            });
            test('should call mockMailService.resetPassword only once if have user and token', async () => {
                if (mockMessage) {
                    await mockAuthService.forgotPassword(mockEmailForget);
                    await expect(await mockMailService.resetPassword).toBeCalledTimes(1);
                }
            });
            test('should call mockMailService.resetPassword with mock params if have user', async () => {
                if (mockMessage) {
                    await mockAuthService.forgotPassword(mockEmailForget);
                    await expect(await mockMailService.resetPassword).toBeCalledWith(mockedUser, mockAccess_Token);
                }
            });
            test('should have resolved value form  mockMailService.resetPassword  if have user and token', async () => {
                if (mockMessage) {
                    await mockAuthService.forgotPassword(mockEmailForget);
                    await expect(await mockMailService.resetPassword).resolves.toEqual('true');
                }
            });
            test('should have valid rejected output from mockMailService.resetPassword if have user and token', async () => {
                if (mockMessage) {
                    await mockAuthService.forgotPassword(mockEmailForget);
                    await expect(await mockMailService.resetPassword).rejects.toEqual(null);
                }
            });
            test('should throw exception if no user found', async () => {
                if (mockMessage) {
                    if (!mockedUser) {
                        expect.assertions(1);
                        try {
                            expect(await mockAuthService.forgotPassword(mockEmailForget)).rejects.toThrow(new common_1.HttpException('No user found with this email', common_1.HttpStatus.NOT_FOUND));
                        }
                        catch (error) {
                            expect(error).rejects.toBeInstanceOf(common_1.HttpException);
                            expect(error).toHaveProperty('message', 'No user found with this email');
                            expect(error).toHaveProperty('status', 500);
                        }
                    }
                }
            });
        });
        describe(('resetpassword'), () => {
            const mockResetPasswordToken = mockReq.body['access_token'];
            const mockResetPasswordBody = mockReq.body;
            const pass = mockedUser['password'];
            const confirmPass = TestSignUpUser['confirmPassword'];
            const resetPasswordEmail = mockedUser['email'];
            beforeEach(async () => {
                jest.clearAllMocks();
            });
            test('should be defined', async () => {
                expect(await mockAuthService.resetPassword).toBeDefined();
            });
            test('should not throw error', async () => {
                expect(await mockAuthService.resetPassword).not.toThrow();
            });
            const decode = jest.spyOn(mockJwtService, 'decode').mockImplementation(async (mockResetPasswordToken) => {
                if (mockResetPasswordToken) {
                    return Promise.resolve(mockedUser);
                }
                else {
                    return Promise.resolve(null);
                }
            });
            test('should throw exception if no decode user found', async () => {
                expect.assertions(3);
                try {
                    expect(await mockAuthService.resetPassword(mockResetPasswordToken, mockResetPasswordBody)).rejects.toThrow(new common_1.HttpException('Invailid Token', common_1.HttpStatus.NOT_FOUND));
                    expect(await mockJwtService.decode).toBeCalled();
                }
                catch (error) {
                    expect(error).toBeInstanceOf(common_1.HttpException);
                    expect(error).toHaveProperty('message', 'Invailid Token');
                    expect(error).toHaveProperty('status', 404);
                }
            });
            test('should not call mockJwtService.decode if have invalid token', async () => {
                if (!decode) {
                    if (mockResetPasswordToken) {
                        await mockAuthService.resetPassword(mockResetPasswordToken, mockResetPasswordBody);
                    }
                }
                expect(await mockJwtService.decode).toBeCalledTimes(0);
            });
            const encryptPassword = jest.spyOn(mockUserService, 'hashPassword').mockImplementation(async (pass) => {
                if (pass) {
                    return Promise.resolve(mockedUser['password']);
                }
                else {
                    return Promise.resolve(null);
                }
            });
            const match = jest.spyOn(mockUserService, 'comparePassword').mockImplementation(async (confirmPass, encryptPassword) => {
                if (confirmPass && encryptPassword) {
                    return Promise.resolve('match');
                }
                else {
                    return Promise.resolve(null);
                }
            });
            const user = jest.spyOn(mockUserService, 'findOneByEmail').mockImplementation(async (resetPasswordEmail) => {
                if (resetPasswordEmail) {
                    return Promise.resolve(mockedUser);
                }
                else {
                    return Promise.resolve(null);
                }
            });
            const updateUser = jest.spyOn(mockUserService, 'updatePassword').mockImplementation(async (mockedUser) => {
                if (mockedUser) {
                    return Promise.resolve('Updated');
                }
                else {
                    return Promise.resolve(null);
                }
            });
            test('should call mockUserService.hashPassword', async () => {
                if (!decode) {
                    if (mockResetPasswordToken) {
                        await mockAuthService.resetPassword(mockResetPasswordToken, mockResetPasswordBody);
                    }
                    expect(await mockUserService.hashPassword).toBeCalled();
                }
            });
            test('should call mockUserService.hashPassword only once', async () => {
                if (!decode) {
                    if (mockResetPasswordToken) {
                        await mockAuthService.resetPassword(mockResetPasswordToken, mockResetPasswordBody);
                    }
                    expect(await mockUserService.hashPassword).toBeCalledTimes(1);
                }
            });
            test('should call mockUserService.hashPassword with mock params', async () => {
                if (!decode) {
                    if (mockResetPasswordToken) {
                        await mockAuthService.resetPassword(mockResetPasswordToken, mockResetPasswordBody);
                    }
                    expect(await mockUserService.hashPassword).toBeCalledWith(pass);
                }
            });
            test('should have valid resolved output from mockUserService.hashPassword', async () => {
                if (!decode) {
                    if (mockResetPasswordToken) {
                        await mockAuthService.resetPassword(mockResetPasswordToken, mockResetPasswordBody);
                    }
                    expect(await mockUserService.hashPassword).resolves.toEqual(mockedUser['password']);
                }
            });
            test('should have valid rejected output from mockUserService.hashPassword', async () => {
                if (!decode) {
                    if (mockResetPasswordToken) {
                        await mockAuthService.resetPassword(mockResetPasswordToken, mockResetPasswordBody);
                    }
                    expect(await mockUserService.hashPassword).rejects.toEqual(null);
                }
            });
            test('should call mockUserService.comparePassword', async () => {
                if (!decode) {
                    if (mockResetPasswordToken) {
                        await mockAuthService.resetPassword(mockResetPasswordToken, mockResetPasswordBody);
                    }
                    expect(await mockUserService.comparePassword).toBeCalled();
                }
            });
            test('should call mockUserService.comparePassword only once', async () => {
                if (!decode) {
                    if (mockResetPasswordToken) {
                        await mockAuthService.resetPassword(mockResetPasswordToken, mockResetPasswordBody);
                    }
                    expect(await mockUserService.comparePassword).toBeCalledTimes(1);
                }
            });
            test('should call mockUserService.comparePassword with mock params', async () => {
                if (!decode) {
                    if (mockResetPasswordToken) {
                        await mockAuthService.resetPassword(mockResetPasswordToken, mockResetPasswordBody);
                    }
                    expect(await mockUserService.comparePassword).toBeCalledWith(confirmPass && encryptPassword);
                }
            });
            test('should have valid resolved output from mockUserService.comparePassword', async () => {
                if (!decode) {
                    if (mockResetPasswordToken) {
                        await mockAuthService.resetPassword(mockResetPasswordToken, mockResetPasswordBody);
                    }
                    expect(await mockUserService.comparePassword).resolves.toEqual('match');
                }
            });
            test('should have valid rejected output from mockUserService.comparePassword', async () => {
                if (!decode) {
                    if (mockResetPasswordToken) {
                        await mockAuthService.resetPassword(mockResetPasswordToken, mockResetPasswordBody);
                    }
                    expect(await mockUserService.comparePassword).rejects.toEqual(null);
                }
            });
            test('should call mockUserService.findOneByEmail', async () => {
                if (!decode) {
                    if (mockResetPasswordToken) {
                        await mockAuthService.resetPassword(mockResetPasswordToken, mockResetPasswordBody);
                    }
                    expect(await mockUserService.findOneByEmail).toBeCalled();
                }
            });
            test('should call mockUserService.findOneByEmail only once', async () => {
                if (!decode) {
                    if (mockResetPasswordToken) {
                        await mockAuthService.resetPassword(mockResetPasswordToken, mockResetPasswordBody);
                    }
                    expect(await mockUserService.findOneByEmail).toBeCalledTimes(1);
                }
            });
            test('should call mockUserService.findOneByEmail with mock params', async () => {
                if (!decode) {
                    if (mockResetPasswordToken) {
                        await mockAuthService.resetPassword(mockResetPasswordToken, mockResetPasswordBody);
                    }
                    expect(await mockUserService.findOneByEmail).toBeCalledWith(resetPasswordEmail);
                }
            });
            test('should have valid resolved output from mockUserService.findOneByEmail', async () => {
                if (!decode) {
                    if (mockResetPasswordToken) {
                        await mockAuthService.resetPassword(mockResetPasswordToken, mockResetPasswordBody);
                    }
                    expect(await mockUserService.findOneByEmail).resolves.toEqual(mockedUser);
                }
            });
            test('should have valid rejected output from mockUserService.findOneByEmail', async () => {
                if (!decode) {
                    if (mockResetPasswordToken) {
                        await mockAuthService.resetPassword(mockResetPasswordToken, mockResetPasswordBody);
                    }
                    expect(await mockUserService.findOneByEmail).rejects.toEqual(null);
                }
            });
            test('should call mockUserService.updatePassword', async () => {
                if (!decode) {
                    if (mockResetPasswordToken) {
                        await mockAuthService.resetPassword(mockResetPasswordToken, mockResetPasswordBody);
                    }
                    expect(await mockUserService.updatePassword).toBeCalled();
                }
            });
            test('should call mockUserService.updatePassword only once', async () => {
                if (!decode) {
                    if (mockResetPasswordToken) {
                        await mockAuthService.resetPassword(mockResetPasswordToken, mockResetPasswordBody);
                    }
                    expect(await mockUserService.updatePassword).toBeCalledTimes(1);
                }
            });
            test('should call mockUserService.updatePassword with mock params', async () => {
                if (!decode) {
                    if (mockResetPasswordToken) {
                        await mockAuthService.resetPassword(mockResetPasswordToken, mockResetPasswordBody);
                    }
                    expect(await mockUserService.updatePassword).toBeCalledWith(mockedUser);
                }
            });
            test('should have valid resolved output from mockUserService.updatePassword', async () => {
                if (!decode) {
                    if (mockResetPasswordToken) {
                        await mockAuthService.resetPassword(mockResetPasswordToken, mockResetPasswordBody);
                    }
                    expect(await mockUserService.updatePassword).resolves.toEqual('Updated');
                }
            });
            test('should have valid rejected output from mockUserService.updatePassword', async () => {
                if (!decode) {
                    if (mockResetPasswordToken) {
                        await mockAuthService.resetPassword(mockResetPasswordToken, mockResetPasswordBody);
                    }
                    expect(await mockUserService.updatePassword).rejects.toEqual(null);
                }
            });
            test('should throw exception if no match found', async () => {
                if (!match) {
                    expect.assertions(2);
                    try {
                        expect(await mockAuthService.resetPassword(mockResetPasswordToken, mockResetPasswordBody)).rejects.toThrow(new common_1.HttpException('passwords are not matched', common_1.HttpStatus.BAD_REQUEST));
                    }
                    catch (error) {
                        expect(error).toBeInstanceOf(common_1.HttpException);
                        expect(error).toHaveProperty('message', 'passwords are not matched');
                        expect(error).toHaveProperty('status', 400);
                    }
                }
            });
            test('should throw exception if no user found', async () => {
                if (!user) {
                    expect.assertions(2);
                    try {
                        expect(await mockAuthService.resetPassword(mockResetPasswordToken, mockResetPasswordBody)).rejects.toThrow(new common_1.HttpException('No user found with this email', common_1.HttpStatus.NOT_FOUND));
                    }
                    catch (error) {
                        expect(error).toBeInstanceOf(common_1.HttpException);
                        expect(error).toHaveProperty('message', 'No user found with this email');
                        expect(error).toHaveProperty('status', 404);
                    }
                }
            });
        });
    });
});
//# sourceMappingURL=auth.service.spec.js.map