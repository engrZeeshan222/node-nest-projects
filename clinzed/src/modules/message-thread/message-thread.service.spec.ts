import { Test, TestingModule } from '@nestjs/testing';
import { MessageThreadService } from './message-thread.service';

describe('MessageThreadService', () => {
  let service: MessageThreadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessageThreadService],
    }).compile();

    service = module.get<MessageThreadService>(MessageThreadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
