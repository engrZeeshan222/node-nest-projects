import { Injectable, PipeTransform } from '@nestjs/common';
import * as path from 'path';
import * as sharp from 'sharp';
@Injectable()
export class SharpPipe
  implements PipeTransform<Express.Multer.File, Promise<any>>
{
  async transform(image: Express.Multer.File): Promise<any> {
    const originalName = path.parse(image?.originalname).name;
    const name = Date.now() + '-' + originalName;
    const smallFilename = name + '-small.png';
    const largeFilename = name + '-large.png';
    const mediumFilename = name + '-medium.png';

    await sharp(image.buffer)
      .resize(500)
      .png({ effort: 3 })
      .toFile(path.join('uploads', smallFilename));
    await sharp(image.buffer)
      .resize(1000)
      .png({ effort: 3 })
      .toFile(path.join('uploads', largeFilename));
    await sharp(image.buffer)
      .resize(1000)
      .png({ effort: 3 })
      .toFile(path.join('uploads', mediumFilename));

    return { mediumFilename, largeFilename, smallFilename, key: name };
  }
}
