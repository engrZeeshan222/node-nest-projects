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
exports.PhotoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const photo_entity_1 = require("./entities/photo.entity");
let PhotoService = class PhotoService {
    constructor(photoRepository) {
        this.photoRepository = photoRepository;
    }
    async create(createPhotoDto) {
        try {
            const where = {
                thumbnail: true,
            };
            if (createPhotoDto.carColor) {
                where['carColor'] = createPhotoDto.carColor;
            }
            else {
                where['property'] = createPhotoDto.property;
            }
            const photos = await this.photoRepository.find({
                where: where,
            });
            let photo = await this.photoRepository.create(createPhotoDto);
            if (photos.length == 0) {
                photo.thumbnail = true;
            }
            photo = await this.photoRepository.save(photo);
            return photo;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async findOne(id) {
        try {
            const photo = await this.photoRepository.findOne({
                where: { id: id },
            });
            return photo;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async changeThumbnail(id) {
        try {
            let reqPhotoForThumbnail = await this.photoRepository.findOne({
                where: {
                    id,
                },
            });
            const alreadyExistedThumbNail = await this.photoRepository.findOne({
                where: {
                    thumbnail: true,
                    property: reqPhotoForThumbnail.property,
                    carColor: reqPhotoForThumbnail.carColor,
                },
            });
            if (alreadyExistedThumbNail) {
                alreadyExistedThumbNail.thumbnail = false;
                await this.photoRepository.save(Object.assign({}, alreadyExistedThumbNail));
            }
            reqPhotoForThumbnail.thumbnail = true;
            reqPhotoForThumbnail = await this.photoRepository.save(Object.assign({}, reqPhotoForThumbnail));
            return reqPhotoForThumbnail;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async remove(id) {
        try {
            const photo = await this.photoRepository.findOne({
                where: {
                    id,
                },
            });
            if (photo.thumbnail) {
                throw new common_1.HttpException('You cant delete thumbnail kindly change thumbnail', common_1.HttpStatus.FORBIDDEN);
            }
            await this.photoRepository.remove(photo);
            return photo;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
};
PhotoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(photo_entity_1.Photo)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PhotoService);
exports.PhotoService = PhotoService;
//# sourceMappingURL=photo.service.js.map