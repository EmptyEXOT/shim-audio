import {
  Controller,
  Get,
  Headers,
  HttpStatus,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { JWTAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { SessionService } from 'src/session/session.service';
import { access } from 'fs';

interface AuthenticatedRequest extends Request {
  user: Omit<User, 'password'>;
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
    private readonly sessionService: SessionService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req: AuthenticatedRequest,
    @Headers('user-agent') userAgent: string,
    @Response() response,
  ) {
    // console.log(req);
    const mode = this.configService.get<string>('MODE');
    const { accessToken, refreshToken, session } = await this.authService.login(
      req.user,
      userAgent,
    );
    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 дней
      sameSite: 'Lax',
      secure: mode === 'production',
    });
    // console.log(`login api refreshToken: ${refreshToken}`);
    return response.json({ accessToken, refreshToken, session });
  }

  @Post('refresh')
  async refresh(@Request() req, @Response() response) {
    const mode = this.configService.get<string>('MODE');
    const refreshToken = req.cookies['refresh_token'] || req.body.refreshToken;

    console.log('auth/refresh -> refresh token:', refreshToken);
    if (!refreshToken) {
      return response
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Refresh token not found' }); // Если токен не найден
    }

    const result = await this.authService.refreshTokens(
      refreshToken,
      req.body.sessionId,
    );

    response.cookie('refresh_token', result['refreshToken'], {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 дней
      sameSite: 'Lax',
      secure: mode === 'production',
    });
    console.log(result);
    return response.json(result);
  }

  @UseGuards(JWTAuthGuard)
  @Post('logout')
  async logout(@Request() req) {
    console.log(req.body);
    return await this.authService.logout(req.user.id, 1);
  }

  @Post('validate')
  async validate(@Request() req) {
    // console.log(req.cookies['refreshToken']);
    return await this.authService.verify(req.body.accessToken);
    // return response.json(isValid);
  }

  @UseGuards(JWTAuthGuard)
  @Get('restore-session')
  async restoreSession(@Request() req) {
    const user = await this.userService.findOne(req.body.userId);
    const session = await this.sessionService.findOne(req.body.sessionId);

    return {
      email: user.email,
      sessionId: session.id,
    };
  }
}
