import { Module } from '@nestjs/common';
import { CarMakeService } from './car-make.service';
import { CarMakeController } from './car-make.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarMake } from './entities/car-make.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CarMake])],
  controllers: [CarMakeController],
  providers: [CarMakeService],
})
export class CarMakeModule {}
