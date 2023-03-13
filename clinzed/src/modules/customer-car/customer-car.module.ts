import { Module } from '@nestjs/common';
import { CustomerCarService } from './customer-car.service';
import { CustomerCarController } from './customer-car.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerCar } from './entities/customer-car.entity';
import { UsersModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerCar]), UsersModule],
  controllers: [CustomerCarController],
  providers: [CustomerCarService],
})
export class CustomerCarModule {}
