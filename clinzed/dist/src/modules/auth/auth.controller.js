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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const login_dto_1 = require("./dto/login.dto");
const signup_dto_1 = require("./dto/signup.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(req) {
        return await this.authService.login(req.user, req.body);
    }
    async signUp(signUpUser) {
        return await this.authService.create(signUpUser);
    }
    async googleLogin(access_token) {
        return await this.authService.google(access_token);
    }
    async faceBookLogin(access_token) {
        return await this.authService.facebook(access_token);
    }
    async verifyAccount(params) {
        return await this.authService.verifyAccount(params);
    }
    async forgotPassword(email) {
        return await this.authService.forgotPassword(email);
    }
    async resetPassword(token, body) {
        try {
            return await this.authService.resetPassword(token, body);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('local')),
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiBody)({ type: login_dto_1.LoginUserDto }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('signup'),
    (0, swagger_1.ApiBody)({ type: signup_dto_1.SignUpUserDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_dto_1.SignUpUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)('google'),
    __param(0, (0, common_1.Body)('access_token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleLogin", null);
__decorate([
    (0, common_1.Post)('facebook'),
    __param(0, (0, common_1.Body)('access_token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "faceBookLogin", null);
__decorate([
    (0, common_1.Get)('verify'),
    __param(0, (0, common_1.Query)('')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyAccount", null);
__decorate([
    (0, common_1.Post)('forgot-password'),
    __param(0, (0, common_1.Body)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Patch)('reset-password/:token'),
    __param(0, (0, common_1.Param)('token')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map