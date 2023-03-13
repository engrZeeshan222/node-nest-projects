import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User, token: string) {
    const url = `${process.env.FRONT_END_BASE_URL}auth/verify?token=${token}`;
    await this.mailerService.sendMail({
      to: user.email,
      //   from: `"Support Team" <${process.env.FRONT_END_BASE_URL}>`,
      subject: 'Welcome to Clinzed! Confirm your Email',
      template: './confirmation', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: user.firstName,
        url,
      },
    });
  }
  async resetPassword(user: User, token: string) {
    const url = `${process.env.FRONT_END_BASE_URL}}auth/reset-password??token=${token}`;
    await this.mailerService.sendMail({
      to: user.email,
      //   from: `"Support Team" <${process.env.FRONT_END_BASE_URL}>`,
      subject: 'PASSWORD RESETTING REQUEST',
      template: './resetPassword', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: user.firstName,
        url,
      },
    });
  }
}
