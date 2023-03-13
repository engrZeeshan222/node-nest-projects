import { Test, TestingModule } from '@nestjs/testing';
import { CarYearController } from './car-year.controller';
import { CarYearService } from './car-year.service';

describe('CarYearController', () => {
  let controller: CarYearController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarYearController],
      providers: [CarYearService],
    }).compile();

    controller = module.get<CarYearController>(CarYearController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
