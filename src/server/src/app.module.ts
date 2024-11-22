import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './user/entities/user.entity';
import { SessionModule } from './session/session.module';
import { ClientSession } from './session/entities/session.entity';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { CookieModule } from './cookie/cookie.module';
import { ValidationModule } from './validation/validation.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [User, ClientSession],
      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development'],
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        secure: true,
        auth: {
          user: process.env.NODEMAILER_USER,
          pass: process.env.NODEMAILER_PASS,
        },
        from: 'Shim Audio <alimsadullaev18@gmail.com>',
      },
    }),
    AuthModule,
    SessionModule,
    CookieModule,
    ValidationModule,
  ],
})
export class AppModule {}
