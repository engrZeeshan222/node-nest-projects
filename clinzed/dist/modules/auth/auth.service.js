"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const google_auth_library_1 = require("google-auth-library");
const enum_1 = require("src/common/enum");
const mail_service_1 = require("../mail/mail.service");
const user_service_1 = require("../user/user.service");
const axios = require('axios').default;
const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
let AuthService = class AuthService {
    constructor(userService, jwtService, mailService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.mailService = mailService;
    }
    async validateUser(identifier, pass) {
        try {
            const user = await this.userService.findOneByEmail(identifier);
            if (!user) {
                throw new common_1.HttpException('No user found with this email', common_1.HttpStatus.NOT_FOUND);
            }
            if (user.status != enum_1.UserStatus.APPROVED) {
                throw new common_1.HttpException('Sorry your account is not Activated', common_1.HttpStatus.NOT_FOUND);
            }
            const match = await this.userService.comparePassword(pass, user.password);
            if (!match) {
                throw new common_1.HttpException('InCorrect Password', common_1.HttpStatus.NOT_FOUND);
            }
            const { password } = user, result = __rest(user, ["password"]);
            return result;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async login(user, loginBody) {
        try {
            await this.userService.loginAs((loginBody === null || loginBody === void 0 ? void 0 : loginBody.isHost) || false, user);
            const token = await this.generateToken(user, (loginBody === null || loginBody === void 0 ? void 0 : loginBody.isHost) || false);
            return { user, token };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async generateToken(user, isHost) {
        try {
            let payload = {
                id: user.id,
                email: user.email,
                role: user.role,
                isHost: isHost || false,
            };
            payload = JSON.parse(JSON.stringify(payload));
            const token = await this.jwtService.signAsync(payload, {
                secret: process.env.JWTKEY,
                expiresIn: process.env.TOKEN_EXPIRATION,
            });
            return token;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(signUpUserDto) {
        try {
            const userAlreadyExist = await this.userService.findOneByEmail(signUpUserDto.email);
            if (userAlreadyExist) {
                throw new common_1.HttpException('user with this email already exist', common_1.HttpStatus.BAD_REQUEST);
            }
            const encryptPassword = await this.userService.hashPassword(signUpUserDto.password);
            const match = await this.userService.comparePassword(signUpUserDto.confirmPassword, encryptPassword);
            if (!match) {
                throw new common_1.HttpException('passwords are not matched', common_1.HttpStatus.BAD_REQUEST);
            }
            const user = await this.userService.create(Object.assign(Object.assign({}, signUpUserDto), { password: encryptPassword }));
            const token = await this.generateToken(user);
            await this.mailService.sendUserConfirmation(user, token);
            const { password } = user, result = __rest(user, ["password"]);
            return { user: result };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async facebook(access_token) {
        try {
            const { data } = await axios({
                url: 'https://graph.facebook.com/v2.9/me',
                method: 'get',
                params: {
                    client_id: process.env.FACEBOOK_ACESS_TOKEN,
                    client_secret: process.env.FACEBOOK_APP_SECRET,
                    fields: ['id', 'email', 'first_name', 'last_name'].join(','),
                    access_token,
                },
            });
            const createUserInput = {
                email: data.email,
                firstName: data.first_name,
                facebookId: data.id,
                provider: 'facebook',
                status: enum_1.UserStatus.APPROVED,
                lastName: data.last_name,
            };
            const user = await this.userService.socialLogin(createUserInput);
            return await this.login(user);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async google(access_token) {
        try {
            const ticket = await client.verifyIdToken({
                idToken: access_token,
            });
            const payload = ticket.getPayload();
            if (!payload) {
                throw new common_1.NotFoundException('No user found with this email');
            }
            const createUserInput = {
                email: payload.email,
                firstName: payload.given_name,
                googleId: payload.sub,
                provider: 'google',
                lastName: payload.family_name,
            };
            const user = await this.userService.socialLogin(createUserInput);
            return await this.login(user);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async verifyAccount(params) {
        const decodeUser = await this.jwtService.decode(params.token);
        if (!decodeUser) {
            throw new common_1.HttpException('Invailid Token', common_1.HttpStatus.NOT_FOUND);
        }
        let user = await this.userService.findOneById(decodeUser['id']);
        user = await this.userService.activateAccount(user);
        const token = await this.generateToken(user);
        return { user, token };
    }
    async forgotPassword(email) {
        try {
            const user = await this.userService.findOneByEmail(email);
            if (!user) {
                throw new common_1.HttpException('No user found with this email', common_1.HttpStatus.NOT_FOUND);
            }
            const token = await this.generateToken(user);
            await this.mailService.resetPassword(user, token);
            return { message: 'mail has been sent on given email' };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async resetPassword(token, body) {
        try {
            const decodedUser = await this.jwtService.decode(token);
            if (!decodedUser) {
                throw new common_1.HttpException('Invailid Token', common_1.HttpStatus.NOT_FOUND);
            }
            const encryptPassword = await this.userService.hashPassword(body.password);
            const match = await this.userService.comparePassword(body.confirmPassword, encryptPassword);
            if (!match) {
                throw new common_1.HttpException('passwords are not matched', common_1.HttpStatus.BAD_REQUEST);
            }
            const user = await this.userService.findOneByEmail(decodedUser['email']);
            if (!user) {
                throw new common_1.HttpException('No user found with this email', common_1.HttpStatus.NOT_FOUND);
            }
            user.password = encryptPassword;
            const updatedUser = await this.userService.updatePassword(user);
            return {
                message: 'your password has been updated successfully',
                user: updatedUser,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UsersService,
        jwt_1.JwtService,
        mail_service_1.MailService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map