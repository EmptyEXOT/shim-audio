import { MailerService } from '@nestjs-modules/mailer';
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
  UsePipes,
} from '@nestjs/common';
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
import { ErrorMessages } from 'src/shared/enums/error-messages.enum';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/Login.dto';
import { RefreshTokensResponseDto } from './dto/RefreshTokens.dto';
import { RegisterRequestDto } from './dto/Register.dto';
import { ValidateResponseDto } from './dto/Validate.dto';
import { JWTAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthTokens } from './types/AuthTokens.type';
import { JwtPayload } from './types/jwt-payload.interface';

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
  @Get('confirm/:token')
  async confirm(
    @Param('token') token: string,
  ): Promise<Omit<User, 'password'>> {
    const { sub: userId } = await this.authService.verify<JwtPayload>(token);
    const candidate = await this.userService.findOne(userId);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.userService.confirm(candidate);
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
        .json({ message: 'Refresh token not found' });
    }

    const { newRefreshToken, ...result } = await this.authService.refreshTokens(
      refreshToken,
      +req.body.sessionId,
    );

    this.cookieService.setRefreshToken(response, newRefreshToken);
    return result;
  }

  // TODO: нужно создать сервис!
  @UseGuards(JWTAuthGuard)
  @Post('logout')
  async logout() {
    return await this.authService.logout(1);
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
