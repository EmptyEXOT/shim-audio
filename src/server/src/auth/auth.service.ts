import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from './types/jwt-payload.interface';
import { User } from 'src/users/entities/user.entity';
import { SessionService } from 'src/session/session.service';
import { JWT_SECRET } from 'src/constants';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private sessionService: SessionService,
  ) {}

  async validateUser(email: string, password: string) {
    console.log(email || 'nt');
    const user = await this.userService.findOneByEmail(email);
    if (user && compareSync(password, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // Данный сервис только генерирует и возвращает jwt. Проверка происходит в validateUser
  async login(user: Omit<User, 'password'>, userAgent: string) {
    const { accessToken, refreshToken } = await this.generateTokens(user);
    const session = await this.sessionService.create(
      { userEmail: user.email, refreshToken },
      userAgent,
    );

    return { accessToken, refreshToken, session: session.id };
  }

  async generateTokens(user: Omit<User, 'password'>) {
    const payload: JwtPayload = {
      email: user.email,
      sub: user.id,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async refreshTokens(refreshToken: string, sessionId: number) {
    const isValid = this.jwtService.verify(refreshToken, {
      secret: JWT_SECRET,
    });
    if (!isValid) {
      return new UnauthorizedException();
    }
    const info = this.jwtService.decode<JwtPayload>(refreshToken);
    const session = await this.sessionService.findOne(sessionId);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.userService.findOneByEmail(
      info.email,
    );
    console.log(session.refreshToken);

    if (isValid && session.refreshToken === refreshToken) {
      const { accessToken, refreshToken } = await this.generateTokens(user);
      await this.sessionService.setRefreshToken(session.id, refreshToken);
      return { accessToken, refreshToken, session: session.id };
    }
    return new UnauthorizedException();
  }

  async logout(userId: number, sessionId: number) {
    // const user = await this.userService.findOne(userId);
    const session = await this.sessionService.findOne(sessionId);
    return session;
  }

  async verify(token: string) {
    try {
      this.jwtService.verify(token, {
        secret: JWT_SECRET,
      });
      return {
        message: token,
        status: 200,
      };
    } catch (e) {
      return new UnauthorizedException();
    }
  }
}
