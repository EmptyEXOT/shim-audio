import {
  Body,
  Controller,
  Get,
  Headers,
  HttpStatus,
  Param,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/Login.dto';
import { RefreshTokensResponseDto } from './dto/RefreshTokens.dto';
import { RegisterRequestDto } from './dto/Register.dto';
import { ValidateResponseDto } from './dto/Validate.dto';
import { JWTAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { MailerService } from '@nestjs-modules/mailer';
import { JwtPayload } from './types/jwt-payload.interface';
import { CookieService } from 'src/cookie/cookie.service';
import { SessionService } from 'src/session/session.service';
import { AuthTokens } from './types/AuthTokens.type';
import { ClientSession } from 'src/session/entities/session.entity';

interface AuthenticatedRequest extends Request {
  user: Omit<User, 'password'>;
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly mailService: MailerService,
    private readonly cookieService: CookieService,
    private readonly sessionService: SessionService,
  ) {}

  @Post('register')
  async register(@Body() payload: RegisterRequestDto) {
    const candidate = await this.userService.create(payload);
    const confirmationToken =
      await this.authService.generateConfirmationToken(candidate);
    this.mailService.sendMail({
      from: 'Shim Audio <alimsadullaev18@gmail.com>',
      to: payload.email,
      subject: 'Завершение регистрации на Shim Audio',
      text: `Для завершения регистрации перейдите по ссылке: 
      http://localhost:3001/api/auth/confirm/${confirmationToken}`,
    });
  }

  @Get('confirm/:token')
  async confirm(@Param('token') token: string) {
    const { sub: userId } = await this.authService.verify<JwtPayload>(token);
    console.log(userId);
    const candidate = await this.userService.findOne(userId);
    const user = await this.userService.confirm(candidate);
    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req: AuthenticatedRequest,
    @Headers('user-agent') userAgent: string,
    @Response({ passthrough: true }) response,
  ): Promise<LoginResponseDto> {
    const user: User = await this.userService.findOne(req.user.id);
    const tokens: AuthTokens = await this.authService.generateAuthTokens(user);
    const session: ClientSession = await this.sessionService.create(
      user,
      userAgent,
      tokens,
    );
    this.cookieService.setRefreshToken(response, tokens.refreshToken);
    return await this.authService.login(user, session, tokens);
  }

  @Post('refresh')
  async refresh(
    @Request() req,
    @Response({ passthrough: true }) response,
  ): Promise<RefreshTokensResponseDto> {
    const refreshToken = req.cookies['refresh_token'];
    if (!refreshToken) {
      return response
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Refresh token not found' }); // Если токен не найден
    }

    const { newRefreshToken, ...result } = await this.authService.refreshTokens(
      refreshToken,
      +req.body.sessionId,
    );

    this.cookieService.setRefreshToken(response, newRefreshToken);
    return { ...result, statusCode: HttpStatus.OK };
  }

  @UseGuards(JWTAuthGuard)
  @Post('logout')
  async logout(@Request() req) {
    console.log(req.body);
    return await this.authService.logout(req.user.id, 1);
  }

  @UseGuards(JWTAuthGuard)
  @Get('validate')
  async validate(
    @Request() req: AuthenticatedRequest,
  ): Promise<ValidateResponseDto> {
    return {
      userId: req.user.id,
      isValid: true,
      statusCode: HttpStatus.OK,
    };
  }
}
