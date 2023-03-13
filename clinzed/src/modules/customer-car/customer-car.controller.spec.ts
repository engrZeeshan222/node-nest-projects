import { Test, TestingModule } from '@nestjs/testing';
import { CustomerCarController } from './customer-car.controller';
import { CustomerCarService } from './customer-car.service';

describe('CustomerCarController', () => {
  let controller: CustomerCarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerCarController],
      providers: [CustomerCarService],
    }).compile();

    controller = module.get<CustomerCarController>(CustomerCarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
