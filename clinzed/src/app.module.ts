import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import connectionOptions from 'src/config/ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserSettingsModule } from './modules/user-settings/user-settings.module';
import { CustomerCarModule } from './modules/customer-car/customer-car.module';
import { PhotoModule } from './modules/photo/photo.module';
import { memoryStorage } from 'multer';
import { MulterModule } from '@nestjs/platform-express';
import { CreditCardModule } from './modules/credit-card/credit-card.module';
import { CarModelModule } from './modules/car-model/car-model.module';
import { CarMakeModule } from './modules/car-make/car-make.module';
import { CarYearModule } from './modules/car-year/car-year.module';
import { CarColorModule } from './modules/car-color/car-color.module';
import { ChargerTypeModule } from './modules/charger-type/charger-type.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import DatabaseConfig from './config/configuration';
import { validationSchema } from './config/validation';
import { MailModule } from './modules/mail/mail.module';
import { ColorModule } from './modules/color/color.module';
import { StripeModule } from 'nestjs-stripe';
import { PropertyModule } from './modules/property/property.module';
import { InternalNoteModule } from './modules/internal-note/internal-note.module';
import { AddressModule } from './modules/address/address.module';
import { YearChargerTypeModule } from './modules/year-charger-type/year-charger-type.module';
import { ChargerPropertyModule } from './modules/charger-property/charger-property.module';
import { MessagesModule } from './modules/messages/messages.module';
import { MessageThreadModule } from './modules/message-thread/message-thread.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common/guards/roles.guard';
import { FieldGuard } from './common/guards/fields.guard';

@Module({
  imports: [
    MulterModule.register({
      storage: memoryStorage(),
    }),

    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/src/config/env/${
        process.env.NODE_ENV
      }.env`,
      isGlobal: true,
      load: [DatabaseConfig],
      validationSchema,
    }),
    StripeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        apiKey: configService.get('STRIPE_SECRET_KEY'),
        apiVersion: '2020-08-27',
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        connectionOptions(configService),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    MailModule,
    UserSettingsModule,
    CustomerCarModule,
    PhotoModule,
    CreditCardModule,
    CarModelModule,
    CarMakeModule,
    CarYearModule,
    CarColorModule,
    ChargerTypeModule,
    ColorModule,
    PropertyModule,
    InternalNoteModule,
    AddressModule,
    YearChargerTypeModule,
    ChargerPropertyModule,
    MessagesModule,
    MessageThreadModule,
  ],

  controllers: [AppController],

  providers: [AppService,{
    provide: APP_GUARD,
    useClass: RolesGuard,
  },
  {
    provide: APP_GUARD,
    useClass: FieldGuard,
  },],
})
export class AppModule {}
