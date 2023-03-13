import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StripeModule } from 'nestjs-stripe';
import { MailModule } from '../mail/mail.module';
import { UserSettingsModule } from '../user-settings/user-settings.module';
import { User } from './entities/user.entity';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserSettingsModule, MailModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
