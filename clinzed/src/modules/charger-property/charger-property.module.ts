import { Module,forwardRef} from '@nestjs/common';
import { ChargerPropertyService } from './charger-property.service';
import { ChargerPropertyController } from './charger-property.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChargerProperty } from './entities/charger-property.entity';
import { PropertyModule } from '../property/property.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChargerProperty]),
    forwardRef(() => PropertyModule),
  ],
  controllers: [ChargerPropertyController],
  providers: [ChargerPropertyService],
  exports: [ChargerPropertyService],
})
export class ChargerPropertyModule {}
