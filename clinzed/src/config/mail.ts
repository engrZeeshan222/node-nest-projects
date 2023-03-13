import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

export const transportOption = async (configService) => {
  const configuration = {
    transport: {
      host: configService.get('MAIL_HOST'),
      port: configService.get('MAIL_PORT'),
      secure: false,
      auth: {
        user: configService.get('MAIL_USER'),
        pass: configService.get('SENDGRID_API_KEY'),
      },
    },
    defaults: {
      from: configService.get('EMAIL_FROM'),
    },
    template: {
      dir: join(__dirname, './../modules/mail/templates'),
      adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
      options: {
        strict: true,
      },
    },
  };
  return configuration;
};
