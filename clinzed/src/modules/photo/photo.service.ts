import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { Photo } from './entities/photo.entity';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
  ) {}
  async create(createPhotoDto: CreatePhotoDto) {
    try {
      const where = {
        thumbnail: true,
      };
      if (createPhotoDto.carColor) {
        where['carColor'] = createPhotoDto.carColor;
      } else {
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
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: number) {
    try {
      const photo = await this.photoRepository.findOne({
        where: { id: id },
      });

      return photo;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async changeThumbnail(id: number) {
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
        await this.photoRepository.save({ ...alreadyExistedThumbNail });
      }
      reqPhotoForThumbnail.thumbnail = true;
      reqPhotoForThumbnail = await this.photoRepository.save({
        ...reqPhotoForThumbnail,
      });
      return reqPhotoForThumbnail;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  async remove(id: number) {
    try {
      const photo = await this.photoRepository.findOne({
        where: {
          id,
        },
      });
      if (photo.thumbnail) {
        throw new HttpException(
          'You cant delete thumbnail kindly change thumbnail',
          HttpStatus.FORBIDDEN,
        );
      }
      await this.photoRepository.remove(photo);
      return photo;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
