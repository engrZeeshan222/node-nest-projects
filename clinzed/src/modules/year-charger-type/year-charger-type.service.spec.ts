import { Test, TestingModule } from '@nestjs/testing';
import { YearChargerTypeService } from './year-charger-type.service';

describe('YearChargerTypeService', () => {
  let service: YearChargerTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [YearChargerTypeService],
    }).compile();

    service = module.get<YearChargerTypeService>(YearChargerTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
