import { Test, TestingModule } from '@nestjs/testing';
import { YearChargerTypeController } from './year-charger-type.controller';
import { YearChargerTypeService } from './year-charger-type.service';

describe('YearChargerTypeController', () => {
  let controller: YearChargerTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [YearChargerTypeController],
      providers: [YearChargerTypeService],
    }).compile();

    controller = module.get<YearChargerTypeController>(
      YearChargerTypeController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
