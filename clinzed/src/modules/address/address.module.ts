import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { InternalNoteModule } from '../internal-note/internal-note.module';

@Module({
  imports: [TypeOrmModule.forFeature([Address]),InternalNoteModule],
  controllers: [AddressController],
  providers: [AddressService],
  exports: [AddressService],
})
export class AddressModule {}
