import { PartialType } from '@nestjs/swagger';
import { CreateMessageThreadDto } from './create-message-thread.dto';

export class UpdateMessageThreadDto extends PartialType(CreateMessageThreadDto) {}
