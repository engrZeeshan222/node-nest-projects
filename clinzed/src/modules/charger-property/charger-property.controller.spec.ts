import { Test, TestingModule } from '@nestjs/testing';
import { ChargerPropertyController } from './charger-property.controller';
import { ChargerPropertyService } from './charger-property.service';

describe('ChargerPropertyController', () => {
  let controller: ChargerPropertyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChargerPropertyController],
      providers: [ChargerPropertyService],
    }).compile();

    controller = module.get<ChargerPropertyController>(
      ChargerPropertyController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
