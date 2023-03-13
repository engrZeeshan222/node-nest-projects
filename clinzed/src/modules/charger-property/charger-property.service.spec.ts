import { Test, TestingModule } from '@nestjs/testing';
import { ChargerPropertyService } from './charger-property.service';

describe('ChargerPropertyService', () => {
  let service: ChargerPropertyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChargerPropertyService],
    }).compile();

    service = module.get<ChargerPropertyService>(ChargerPropertyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
