import { Test, TestingModule } from '@nestjs/testing';
import { CustomerCarService } from './customer-car.service';

describe('CustomerCarService', () => {
  let service: CustomerCarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerCarService],
    }).compile();

    service = module.get<CustomerCarService>(CustomerCarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
