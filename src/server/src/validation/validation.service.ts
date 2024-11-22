import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JsonWebTokenError, JwtService, TokenExpiredError } from '@nestjs/jwt';
import { validate } from 'class-validator';
import { AuthService } from 'src/auth/auth.service';
import { ErrorMessages } from 'src/shared/enums/error-messages.enum';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ValidationService {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  async validateDto<T extends object>(
    dto: T,
    errors: ErrorMessages[] = [],
    isFinal: boolean = true,
  ): Promise<ErrorMessages[]> {
    const rawErrors = await validate(dto);
    const validationErrors = rawErrors
      .map((err) => Object.values(err.constraints))
      .flat() as ErrorMessages[];
    if (isFinal && validationErrors.length) {
      throw new BadRequestException(errors);
    }
    return errors.concat(validationErrors);
  }

  validatePassword(
    password: string,
    errors: ErrorMessages[] = [],
    isFinal: boolean = true,
  ): ErrorMessages[] {
    if (!this.authService.isPasswordStrong(password)) {
      errors.push(ErrorMessages.PASSWORD_WEAK);
    }
    if (isFinal) {
      throw new BadRequestException(errors);
    }
    return errors;
  }

  async checkEmailBusy(
    email: string,
    errors: ErrorMessages[] = [],
    isFinal: boolean = true,
  ) {
    const existingUser = await this.userService.findOneByEmail(email);
    if (existingUser) {
      errors.push(ErrorMessages.EMAIL_EXISTS);
      if (isFinal) {
        throw new ConflictException(errors);
      }
    }
    return errors;
  }

  validateToken(
    token: string,
    errors: ErrorMessages[] = [],
    isFinal: boolean = true,
  ): ErrorMessages[] {
    if (!token) {
      errors.push(ErrorMessages.ACCESS_TOKEN_REQUIRED);
      if (isFinal) {
        throw new BadRequestException(errors);
      }
      return errors;
    }
    try {
      this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        errors.push(ErrorMessages.ACCESS_TOKEN_EXPIRED);
        if (isFinal) {
          throw new UnauthorizedException(errors);
        }
        return errors;
      } else if (e instanceof JsonWebTokenError) {
        errors.push(ErrorMessages.ACCESS_TOKEN_INVALID);
        if (isFinal) {
          throw new UnauthorizedException(errors);
        }
        return errors;
      }
      errors.push(ErrorMessages.ACCESS_TOKEN_VERIFYING_ERROR);
      if (isFinal) {
        throw new InternalServerErrorException(errors);
      }
      return errors;
    }
  }

  async checkUserExists(
    id: number,
    errors: ErrorMessages[] = [],
    isFinal: boolean = true,
  ) {
    const candidate = await this.userService.findOne(id);
    if (!candidate) {
      errors.push(ErrorMessages.USER_NOT_FOUND);
      if (isFinal) {
        throw new NotFoundException(errors);
      }
    }
    return errors;
  }
}
