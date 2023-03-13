/// <reference types="multer" />
import { PipeTransform } from '@nestjs/common';
export declare class SharpPipe implements PipeTransform<Express.Multer.File, Promise<any>> {
    transform(image: Express.Multer.File): Promise<any>;
}
