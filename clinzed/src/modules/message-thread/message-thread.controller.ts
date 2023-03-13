import { Controller } from '@nestjs/common';
import { MessageThreadService } from './message-thread.service';

@Controller('message-thread')
export class MessageThreadController {
  constructor(private readonly messageThreadService: MessageThreadService) {}
}
