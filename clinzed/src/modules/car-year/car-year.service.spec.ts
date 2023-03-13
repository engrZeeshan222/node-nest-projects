import { Test, TestingModule } from '@nestjs/testing';
import { CarYearService } from './car-year.service';

describe('CarYearService', () => {
  let service: CarYearService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarYearService],
    }).compile();

    service = module.get<CarYearService>(CarYearService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
