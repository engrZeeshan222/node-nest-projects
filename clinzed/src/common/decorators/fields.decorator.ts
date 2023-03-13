import { SetMetadata } from '@nestjs/common';
export const Fields = (...fields: string[]) => SetMetadata('fields', fields);
