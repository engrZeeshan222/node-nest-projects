import { Test, TestingModule } from '@nestjs/testing';
import { CarMakeController } from './car-make.controller';
import { CarMakeService } from './car-make.service';

describe('CarMakeController', () => {
  let controller: CarMakeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarMakeController],
      providers: [CarMakeService],
    }).compile();

    controller = module.get<CarMakeController>(CarMakeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
