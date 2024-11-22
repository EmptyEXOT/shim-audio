import { MailerService } from '@nestjs-modules/mailer';
import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Request,
  Response,
  UnauthorizedException,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  OmitType,
} from '@nestjs/swagger';
import { RegisterValidationPipe } from 'src/auth/pipes/register-validation.pipe';
import { CookieService } from 'src/cookie/cookie.service';
import { ClientSession } from 'src/session/entities/session.entity';
import { SessionService } from 'src/session/session.service';
import { Cookies } from 'src/shared/enums/cookies.enum';
import { ErrorMessages } from 'src/shared/enums/error-messages.enum';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { ValidationService } from 'src/validation/validation.service';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/Login.dto';
import { LogoutRequestDto } from './dto/Logout.dto';
import { RefreshTokensResponseDto } from './dto/RefreshTokens.dto';
import { RegisterRequestDto } from './dto/Register.dto';
import { ValidateResponseDto } from './dto/Validate.dto';
import { JWTAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginValidationPipe } from './pipes/login-validation.pipe';
import { LogoutValidationPipe } from './pipes/logout-validation.pipe';
import { RegisterConfirmationPipe } from './pipes/register-confirmation.pipe';
import { AuthenticatedRequest } from './types/AuthenticatedRequest.interface';
import { AuthTokens } from './types/AuthTokens.type';
import { JwtRegisterEmailConfirmation } from './types/jwt-register-email-confirmation.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly mailService: MailerService,
    private readonly cookieService: CookieService,
    private readonly sessionService: SessionService,
    private readonly jwtService: JwtService,
    private readonly validationService: ValidationService,
  ) {}

  @ApiConflictResponse({
    description:
      'Пользователь с таким email уже существует. Возвращает сообщение об ошибке.',
    schema: {
      example: {
        statusCode: 409,
        error: 'Conflict',
        message: [ErrorMessages.EMAIL_EXISTS],
      },
    },
  })
  @ApiCreatedResponse({
    description: 'Пользователь создан',
    type: OmitType(User, ['password'] as const),
  })
  @ApiBadRequestResponse({
    description:
      'Слабый пароль или ошибка валидации DTO. Возвращает массив сообщений об ошибках.',
    schema: {
      example: {
        statusCode: 400,
        error: 'Bad Request',
        messages: [ErrorMessages.PASSWORD_WEAK, ErrorMessages.FNAME_EMPTY],
      },
    },
  })
  @Post('register')
  @UsePipes(RegisterValidationPipe)
  async register(
    @Body() payload: RegisterRequestDto,
  ): Promise<Omit<User, 'password'>> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...candidate } = await this.userService.create(payload);

    const confirmationToken =
      await this.authService.generateConfirmationToken(candidate);

    this.mailService.sendMail({
      to: payload.email,
      subject: 'Завершение регистрации на Shim Audio',
      text: `Для завершения регистрации перейдите по ссылке:
      ${process.env.REG_CONFIRMATION_EMAIL_URL}${confirmationToken}`,
    });
    return candidate;
  }

  @ApiOkResponse({
    description: 'Ссылка валидна, аккаунт подтвержден',
    type: OmitType(User, ['password'] as const),
  })
  @ApiUnauthorizedResponse({
    description: 'Неверная ссылка',
  })
  @UsePipes(RegisterConfirmationPipe)
  @Get('confirm/:token')
  async confirm(
    @Param('token') token: string,
  ): Promise<Omit<User, 'password'>> {
    console.log(token);
    const { sub: userId } =
      this.jwtService.decode<JwtRegisterEmailConfirmation>(token);
    const candidate = await this.userService.findOne(userId);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.userService.confirm(candidate);
    // TODO: редирект на профиль пользователя
    return user;
  }

  @UseGuards(LocalAuthGuard)
  @UsePipes(LoginValidationPipe)
  @Post('login')
  async login(
    @Request() req: AuthenticatedRequest,
    @Headers('user-agent') userAgent: string,
    @Response({ passthrough: true }) response,
  ): Promise<LoginResponseDto> {
    const tokens: AuthTokens = await this.authService.generateAuthTokens(
      req.user,
    );
    const session: ClientSession = await this.sessionService.create(
      req.user,
      userAgent,
      tokens,
    );
    this.cookieService.setRefreshToken(response, tokens.refreshToken);
    return await this.authService.login(req.user, session, tokens);
  }

  @Post('refresh')
  async refresh(
    @Request() req,
    @Response({ passthrough: true }) response,
  ): Promise<RefreshTokensResponseDto> {
    const refreshToken = req.cookies[Cookies.REFRESH_TOKEN];
    if (!refreshToken) {
      throw new UnauthorizedException(ErrorMessages.REFRESH_TOKEN_REQUIRED);
    }
    this.validationService.validateToken(refreshToken, 'REFRESH_TOKEN');

    const { newRefreshToken, ...result } = await this.authService.refreshTokens(
      req.cookies[Cookies.REFRESH_TOKEN],
      +req.body.sessionId,
    );

    this.cookieService.setRefreshToken(response, newRefreshToken);
    return result;
  }

  // TODO: нужно создать сервис!
  @UseGuards(JWTAuthGuard)
  @UsePipes(LogoutValidationPipe)
  @Post('logout')
  async logout(
    @Body() payload: LogoutRequestDto,
    @Request() req: AuthenticatedRequest,
    @Response({ passthrough: true }) response,
  ) {
    const session = await this.sessionService.findOne(payload.sessionId);
    this.validationService.checkSessionAccess(req.user.id, session);
    this.cookieService.clearRefreshToken(response);
    return await this.sessionService.remove(payload.sessionId);
  }

  @UseGuards(JWTAuthGuard)
  @Get('validate')
  async validate(
    @Request() req: AuthenticatedRequest,
  ): Promise<ValidateResponseDto> {
    return {
      userId: req.user.id,
      isValid: true,
    };
  }
}
