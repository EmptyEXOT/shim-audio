import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JWT_SECRET } from 'src/constants';
import { SessionModule } from 'src/session/session.module';
import { UsersModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JWTStrategy } from './strategies/jwt.strategy';
import { CookieModule } from 'src/cookie/cookie.module';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    PassportModule,
    forwardRef(() => SessionModule),
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '15s' },
    }),
    CookieModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JWTStrategy, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
