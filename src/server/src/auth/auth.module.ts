import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SessionModule } from 'src/session/session.module';
import { UsersModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JWTStrategy } from './strategies/jwt.strategy';
import { CookieModule } from 'src/cookie/cookie.module';
import { LocalStrategy } from './strategies/local.strategy';
import { RegisterValidationPipe } from 'src/shared/pipes/register-validation.pipe';

@Module({
  imports: [
    PassportModule,
    forwardRef(() => SessionModule),
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET as string,
      signOptions: { expiresIn: '15s' },
    }),
    CookieModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JWTStrategy, LocalStrategy, RegisterValidationPipe],
  exports: [AuthService],
})
export class AuthModule {}
