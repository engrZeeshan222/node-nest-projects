import { Module } from '@nestjs/common';
import { CarYearService } from './car-year.service';
import { CarYearController } from './car-year.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarYear } from './entities/car-year.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CarYear])],
  controllers: [CarYearController],
  providers: [CarYearService],
})
export class CarYearModule {}
