import { Test, TestingModule } from '@nestjs/testing';
import { MessageThreadController } from './message-thread.controller';
import { MessageThreadService } from './message-thread.service';

describe('MessageThreadController', () => {
  let controller: MessageThreadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessageThreadController],
      providers: [MessageThreadService],
    }).compile();

    controller = module.get<MessageThreadController>(MessageThreadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
