import {
  BadRequestException,
  forwardRef,
  Inject,
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
import { AuthTokens } from './types/AuthTokens.type';
import { ClientSession } from 'src/session/entities/session.entity';
import { LoginResponseDto } from './dto/Login.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
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
  async login(
    user: User,
    session: ClientSession,
    tokens: AuthTokens,
  ): Promise<LoginResponseDto> {
    // const { accessToken, refreshToken } = await this.generateTokens(user);
    // const session = await this.sessionService.create(
    //   { userEmail: user.email, refreshToken },
    //   userAgent,
    // );

    return {
      accessToken: tokens.accessToken,
      sessionId: session.id,
      email: user.email,
      userId: user.id,
      statusCode: 200,
    };
  }

  async generateAuthTokens(user: Omit<User, 'password'>) {
    const payload: JwtPayload = {
      email: user.email,
      sub: user.id,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async generateConfirmationToken(user: Omit<User, 'password'>) {
    const payload: JwtPayload = {
      email: user.email,
      sub: user.id,
    };
    return this.jwtService.sign(payload, { expiresIn: '6h' });
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

    if (session.refreshToken === refreshToken) {
      const { accessToken, refreshToken } = await this.generateAuthTokens(user);
      await this.sessionService.setRefreshToken(session.id, refreshToken);
      return {
        accessToken,
        newRefreshToken: refreshToken,
        sessionId: session.id,
        email: user.email,
        userId: user.id,
      };
    }
    throw new UnauthorizedException();
  }

  async logout(userId: number, sessionId: number) {
    // const user = await this.userService.findOne(userId);
    const session = await this.sessionService.findOne(sessionId);
    return session;
  }

  async verify<TokenPayload>(token: string): Promise<TokenPayload> {
    if (!token) {
      throw new BadRequestException('Access token is required');
    }
    try {
      this.jwtService.verify(token, {
        secret: JWT_SECRET,
      });
      return this.jwtService.decode<TokenPayload>(token);
    } catch (e) {
      if (e instanceof JsonWebTokenError) {
        throw new UnauthorizedException('Invalid token');
      } else if (e instanceof TokenExpiredError) {
        throw new UnauthorizedException('Token has expired');
      }
      throw new InternalServerErrorException('Error verifying token');
    }
  }

  private isPasswordStrong(password: string): boolean {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*]/.test(password);
    const isValidLength = password.length >= 8 && password.length <= 24;

    return (
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecialChars &&
      isValidLength
    );
  }
}
