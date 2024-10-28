import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JWT_SECRET } from 'src/constants';
import { JWTStrategy } from './strategies/jwt.strategy';
import { SessionService } from 'src/session/session.service';
import { SessionModule } from 'src/session/session.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    SessionModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '5s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JWTStrategy, SessionService],
})
export class AuthModule {}
