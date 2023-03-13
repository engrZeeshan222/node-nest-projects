import { Module,forwardRef } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { AddressModule } from '../address/address.module';
import { ChargerPropertyModule } from '../charger-property/charger-property.module';
import { InternalNoteModule } from '../internal-note/internal-note.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Property]),
    InternalNoteModule,
    AddressModule,
    forwardRef(() => ChargerPropertyModule),
  ],
  controllers: [PropertyController],
  providers: [PropertyService],
  exports: [PropertyService],
})
export class PropertyModule {}
