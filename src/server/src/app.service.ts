import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly mailService: MailerService) {}
  getHello(): string {
    return 'Hello World!';
  }

  sendMail() {
    const message = `Forgot your password? If you didn't forget your password, please ignore this email!`;

    return this.mailService.sendMail({
      from: 'alim sadullaev <alimsadullaev18@gmail.com>',
      to: 'sadullaev.alim@mail.ru',
      subject: `How to Send Emails with Nodemailer`,
      text: message,
    });
  }
}
