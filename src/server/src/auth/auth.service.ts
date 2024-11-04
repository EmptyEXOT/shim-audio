import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JsonWebTokenError, JwtService, TokenExpiredError } from '@nestjs/jwt';
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

    return {
      accessToken,
      refreshToken,
      sessionId: session.id,
      email: user.email,
    };
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
      throw new UnauthorizedException('Invalid Token');
    }
    const info = this.jwtService.decode<JwtPayload>(refreshToken);
    const session = await this.sessionService.findOne(sessionId);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.userService.findOneByEmail(
      info.email,
    );
    console.log('awaited:', session.refreshToken);

    if (session.refreshToken === refreshToken) {
      const { accessToken, refreshToken } = await this.generateTokens(user);
      await this.sessionService.setRefreshToken(session.id, refreshToken);
      return {
        accessToken,
        newRefreshToken: refreshToken,
        sessionId: session.id,
        email: user.email,
      };
    }
    throw new UnauthorizedException();
  }

  async logout(userId: number, sessionId: number) {
    // const user = await this.userService.findOne(userId);
    const session = await this.sessionService.findOne(sessionId);
    return session;
  }

  async verify(token: string) {
    if (!token) {
      throw new BadRequestException('Access token is required');
    }
    try {
      this.jwtService.verify(token, {
        secret: JWT_SECRET,
      });
      return token;
    } catch (e) {
      if (e instanceof JsonWebTokenError) {
        throw new UnauthorizedException('Invalid token');
      } else if (e instanceof TokenExpiredError) {
        throw new UnauthorizedException('Token has expired');
      }
      throw new InternalServerErrorException('Error verifying token');
    }
  }
}
