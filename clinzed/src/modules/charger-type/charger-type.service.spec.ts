import { Test, TestingModule } from '@nestjs/testing';
import { ChargerTypeService } from './charger-type.service';

describe('ChargerTypeService', () => {
  let service: ChargerTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChargerTypeService],
    }).compile();

    service = module.get<ChargerTypeService>(ChargerTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
