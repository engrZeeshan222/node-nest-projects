import { Test, TestingModule } from '@nestjs/testing';
import { CarColorService } from './car-color.service';

describe('CarColorService', () => {
  let service: CarColorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarColorService],
    }).compile();

    service = module.get<CarColorService>(CarColorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
