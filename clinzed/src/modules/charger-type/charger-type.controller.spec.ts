import { Test, TestingModule } from '@nestjs/testing';
import { ChargerTypeController } from './charger-type.controller';
import { ChargerTypeService } from './charger-type.service';

describe('ChargerTypeController', () => {
  let controller: ChargerTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChargerTypeController],
      providers: [ChargerTypeService],
    }).compile();

    controller = module.get<ChargerTypeController>(ChargerTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
