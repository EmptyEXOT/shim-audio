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
import { ConfigService } from '@nestjs/config';
import { SessionService } from 'src/session/session.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { ValidateResponseDto } from './dto/Validate.dto';
import { JWTAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

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
    @Response({ passthrough: true }) response,
  ) {
    // const mode = this.configService.get<string>('MODE');
    const { refreshToken, ...payload } = await this.authService.login(
      req.user,
      userAgent,
    );
    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 дней
      sameSite: 'None',
      secure: true,
    });
    return response.json({ ...payload });
  }

  @Post('refresh')
  async refresh(@Request() req, @Response({ passthrough: true }) response) {
    // const mode = this.configService.get<string>('MODE');
    const refreshToken = req.cookies['refresh_token'];

    console.log('auth/refresh -> refresh token:', refreshToken);
    if (!refreshToken) {
      return response
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Refresh token not found' }); // Если токен не найден
    }

    const { newRefreshToken, ...result } = await this.authService.refreshTokens(
      refreshToken,
      req.body.sessionId,
    );

    response.cookie('refresh_token', newRefreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 дней
      sameSite: 'None',
      secure: true,
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

  @UseGuards(JWTAuthGuard)
  @Get('validate')
  async validate(): Promise<ValidateResponseDto> {
    return {
      isValid: true,
      statusCode: HttpStatus.OK,
    };
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
