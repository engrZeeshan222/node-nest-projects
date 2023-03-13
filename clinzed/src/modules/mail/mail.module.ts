import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { MailService } from './mail.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import DatabaseConfig from 'src/config/configuration';
import { transportOption } from 'src/config/mail';
@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        transportOption(configService),
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
