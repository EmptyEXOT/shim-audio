import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';
import { ClientSession } from 'src/session/entities/session.entity';
import { SessionService } from 'src/session/session.service';
import { ErrorMessages } from 'src/shared/enums/error-messages.enum';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { LoginResponseDto } from './dto/Login.dto';
import { AuthTokens } from './types/AuthTokens.type';
import { JwtPayload } from './types/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private jwtService: JwtService,
    private sessionService: SessionService,
  ) {}

  async validateUser(email: string, password: string) {
    const candidate = await this.userService.findOneByEmail(email);
    if (!candidate) {
      throw new NotFoundException(ErrorMessages.USER_NOT_FOUND);
    }
    if (candidate && compareSync(password, candidate.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = candidate;
      return result;
    }
    return null;
  }

  async login(
    user: Omit<User, 'password'>,
    session: ClientSession,
    tokens: AuthTokens,
  ): Promise<LoginResponseDto> {
    return {
      accessToken: tokens.accessToken,
      sessionId: session.id,
      email: user.email,
      userId: user.id,
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

  async logout(sessionId: number) {
    const session = await this.sessionService.findOne(sessionId);
    return session;
  }

  public isPasswordStrong(password: string): boolean {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*]/.test(password);

    return hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars;
  }
}
