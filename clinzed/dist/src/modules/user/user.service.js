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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const bcrypt = require("bcryptjs");
const enum_1 = require("src/common/enum");
const apiFeatures_1 = require("../utils/apiFeatures");
const user_settings_service_1 = require("../user-settings/user-settings.service");
const nestjs_stripe_1 = require("nestjs-stripe");
const stripe_1 = require("stripe");
const relationsArray = ['userSetting'];
let UsersService = class UsersService {
    constructor(usersRepository, userSettingsService, stripeClient) {
        this.usersRepository = usersRepository;
        this.userSettingsService = userSettingsService;
        this.stripeClient = stripeClient;
    }
    async create(createUserDto) {
        try {
            let user = await this.findOneByEmail(createUserDto.email);
            if (user) {
                throw new common_1.HttpException('user with this email already exist', common_1.HttpStatus.BAD_REQUEST);
            }
            user = await this.usersRepository.create(createUserDto);
            if (user.status === enum_1.UserStatus.APPROVED) {
                const stripeAccount = await this.stripeClient.customers.create({
                    email: user.email,
                    name: `${user.firstName} ${user.lastName}`,
                });
                ({ stripeAccount });
                user.stripeAccountId = stripeAccount.id;
            }
            user = await this.usersRepository.save(user);
            if (user) {
                const userSettingDto = {
                    isHostView: false,
                    user: user,
                };
                await this.userSettingsService.create(userSettingDto);
            }
            return user;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async hashPassword(password) {
        try {
            const hash = await bcrypt.hash(password, 10);
            return hash;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async updatePassword(user) {
        try {
            const updatedUser = await this.usersRepository.save(Object.assign({}, user));
            return updatedUser;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOneByEmail(email) {
        try {
            const user = await this.usersRepository.findOne({
                where: {
                    email: email,
                },
                select: [
                    'password',
                    'email',
                    'firstName',
                    'lastName',
                    'phone',
                    'role',
                    'status',
                    'createdAt',
                    'updatedAt',
                    'id',
                ],
            });
            return user;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async loginAs(inhostVeiw, loginuser) {
        let user = await this.usersRepository.findOne({
            where: {
                id: loginuser.id,
            },
        });
        if (inhostVeiw) {
            user.lastHostLogin = new Date();
        }
        else {
            user.lastCustomerLogin = new Date();
        }
        user = await this.usersRepository.save(Object.assign({}, user));
    }
    async findOneFacebookId(facebookId) {
        try {
            const user = await this.usersRepository.findOne({
                where: {
                    facebookId: facebookId,
                },
                select: [
                    'email',
                    'firstName',
                    'lastName',
                    'phone',
                    'role',
                    'status',
                    'createdAt',
                    'updatedAt',
                    'id',
                ],
            });
            return user;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async comparePassword(enteredPassword, dbPassword) {
        try {
            const match = await bcrypt.compare(enteredPassword, dbPassword);
            return match;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async findOneById(id) {
        try {
            const user = await this.usersRepository.findOne({
                where: {
                    id: id,
                },
            });
            return user;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async findAll(queryParams, user) {
        try {
            const apiData = new apiFeatures_1.default(this.usersRepository, queryParams);
            apiData.paginate().includeFields(relationsArray);
            let data2;
            if (user.role != enum_1.Role.ADMIN) {
                data2 = {
                    status: enum_1.UserStatus.APPROVED,
                    id: (0, typeorm_2.Not)(user.id),
                };
            }
            else {
                data2 = {
                    id: (0, typeorm_2.Not)(user.id),
                };
            }
            const where = [data2];
            apiData.where(where);
            const users = await apiData.query();
            return users;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async activateAccount(user) {
        user.status = enum_1.UserStatus.APPROVED;
        if (user.status === enum_1.UserStatus.APPROVED) {
            const stripeAccount = await this.stripeClient.customers.create({
                email: user.email,
                name: `${user.firstName} ${user.lastName}`,
            });
            user.stripeAccountId = stripeAccount.id;
        }
        user = await this.usersRepository.save(Object.assign({}, user));
        return user;
    }
    async findOne(id, loginUser) {
        try {
            if (loginUser.role == enum_1.Role.ADMIN || id == loginUser.id) {
                const user = await this.usersRepository.findOne({
                    where: {
                        id: id,
                    },
                    relations: relationsArray,
                });
                if (!user) {
                    throw new common_1.HttpException('No user found', common_1.HttpStatus.NOT_FOUND);
                }
                return user;
            }
            else {
                throw new common_1.HttpException('FORBIDDEN', common_1.HttpStatus.FORBIDDEN);
            }
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async update(id, updateUserDto, loginUser) {
        try {
            let user = await this.findOne(id, loginUser);
            user = await this.usersRepository.save(Object.assign(Object.assign({}, user), updateUserDto));
            return user;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async remove(id, loginUser) {
        try {
            let user = await this.findOne(id, loginUser);
            user.status = enum_1.UserStatus.DELETED;
            user = await this.usersRepository.save(Object.assign({}, user));
            if (user.stripeAccountId) {
                const deleted = await this.stripeClient.customers.del(user.stripeAccountId);
            }
            return user;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async socialLogin(createUserInput) {
        try {
            let user;
            if (createUserInput.email) {
                user = await this.findOneByEmail(createUserInput.email);
            }
            else if (createUserInput.provider == 'facebook') {
                user = await this.findOneFacebookId(createUserInput.facebookId);
                if (!user) {
                    createUserInput.email = createUserInput.facebookId;
                }
            }
            if (user) {
                return user;
            }
            user = await this.usersRepository.create(createUserInput);
            return await this.usersRepository.save(user);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, nestjs_stripe_1.InjectStripe)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_settings_service_1.UserSettingsService,
        stripe_1.default])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=user.service.js.map