import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  Delete,
  Patch,
} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { SharpPipe } from 'src/common/pipes/sharp.pipe';

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createPhotoDto: CreatePhotoDto,
    @UploadedFile(SharpPipe) image: any,
  ) {
    createPhotoDto.smallFilePath = `uploads/${image.smallFilename}`;
    createPhotoDto.largeFilePath = `uploads/${image.largeFilename}`;
    createPhotoDto.mediumFilePath = `uploads/${image.mediumFilename}`;
    createPhotoDto.photoKey = image.key;
    return this.photoService.create(createPhotoDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.photoService.findOne(+id);
  }
  @Patch(':id')
  async changeThumbnail(@Param('id') id: string) {
    return this.photoService.changeThumbnail(+id);
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.photoService.remove(+id);
  }
}
