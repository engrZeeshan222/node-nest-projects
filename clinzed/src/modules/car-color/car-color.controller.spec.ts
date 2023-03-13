import { Test, TestingModule } from '@nestjs/testing';
import { CarColorController } from './car-color.controller';
import { CarColorService } from './car-color.service';

describe('CarColorController', () => {
  let controller: CarColorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarColorController],
      providers: [CarColorService],
    }).compile();

    controller = module.get<CarColorController>(CarColorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
