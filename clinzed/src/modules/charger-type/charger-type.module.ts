import { Module } from '@nestjs/common';
import { ChargerTypeService } from './charger-type.service';
import { ChargerTypeController } from './charger-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChargerType } from './entities/charger-type.entity';
import { PropertyModule } from '../property/property.module';

@Module({
  imports: [TypeOrmModule.forFeature([ChargerType])],
  controllers: [ChargerTypeController],
  providers: [ChargerTypeService],
})
export class ChargerTypeModule {}
