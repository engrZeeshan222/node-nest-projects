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
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const message_thread_service_1 = require("../message-thread/message-thread.service");
const user_service_1 = require("../user/user.service");
const message_entity_1 = require("./entities/message.entity");
const relationsArray = [
    'sender',
    'messageThread',
    'messageThread.host',
    'messageThread.customer',
];
let MessagesService = class MessagesService {
    constructor(messageRepository, messageThreadService, usersService) {
        this.messageRepository = messageRepository;
        this.messageThreadService = messageThreadService;
        this.usersService = usersService;
    }
    async create(createMessageDto, loginUser) {
        try {
            const user = await this.usersService.findOne(loginUser.id, loginUser);
            console.log(loginUser.isHost);
            let message;
            createMessageDto.sender = user;
            const createMessageThread = {
                message: createMessageDto.message,
                customer: null,
                host: null,
            };
            console.log('1', loginUser.isHost);
            if (loginUser.isHost) {
                createMessageThread.host = user;
                createMessageThread.customer = createMessageDto.receiver;
            }
            else {
                createMessageThread.customer = user;
                createMessageThread.host = createMessageDto.receiver;
            }
            const messageThread = await this.messageThreadService.create(createMessageThread, user);
            message = this.messageRepository.create(createMessageDto);
            message.dateSent = new Date();
            message.messageThread = messageThread;
            message = await this.messageRepository.save(message);
            return message;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async findAll(queryParams, loginUser) {
        try {
            const user = await this.usersService.findOne(loginUser.id, loginUser);
            const messageThread = await this.messageThreadService.findAll(user, loginUser.isHost);
            const allIdsOfMessageThread = [];
            messageThread.forEach((ele) => {
                allIdsOfMessageThread.push(ele.id);
            });
            console.log({ messageThread });
            return messageThread;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async findOne(id) {
        try {
            const messageThread = await this.messageThreadService.findOne(id);
            console.log(messageThread);
            const messages = await this.messageRepository.find({
                where: {
                    messageThread: {
                        id: messageThread.id,
                    },
                },
            });
            return messages;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async readAll(id, user) {
        try {
            const messageThread = await this.messageThreadService.findOne(id);
            if (user.id == messageThread.host.id ||
                user.id == messageThread.customer.id) {
                await this.messageThreadService.readAll(messageThread.id, user);
            }
            else {
                throw new common_1.HttpException('not allowed', common_1.HttpStatus.FORBIDDEN);
            }
            return 'all marked as read';
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
};
MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(message_entity_1.Message)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        message_thread_service_1.MessageThreadService,
        user_service_1.UsersService])
], MessagesService);
exports.MessagesService = MessagesService;
//# sourceMappingURL=messages.service.js.map