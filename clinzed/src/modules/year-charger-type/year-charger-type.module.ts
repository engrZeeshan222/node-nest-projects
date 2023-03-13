import { Module } from '@nestjs/common';
import { YearChargerTypeService } from './year-charger-type.service';
import { YearChargerTypeController } from './year-charger-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { YearChargerType } from './entities/year-charger-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([YearChargerType])],
  controllers: [YearChargerTypeController],
  providers: [YearChargerTypeService],
})
export class YearChargerTypeModule {}
