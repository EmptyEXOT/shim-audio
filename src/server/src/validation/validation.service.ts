import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { AuthService } from 'src/auth/auth.service';
import { ErrorMessages } from 'src/shared/enums/error-messages.enum';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ValidationService {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
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

  async checkUserExistence(
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
}
