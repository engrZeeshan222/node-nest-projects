import { Test, TestingModule } from '@nestjs/testing';
import { CarMakeService } from './car-make.service';

describe('CarMakeService', () => {
  let service: CarMakeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarMakeService],
    }).compile();

    service = module.get<CarMakeService>(CarMakeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
