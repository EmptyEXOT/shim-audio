import { ConflictException, Injectable } from '@nestjs/common';
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

  async validateDto<T extends object>(dto: T): Promise<ErrorMessages[]> {
    const validationErrors = await validate(dto);
    return validationErrors
      .map((err) => Object.values(err.constraints))
      .flat() as ErrorMessages[];
  }

  validatePassword(password: string, errors: ErrorMessages[]): void {
    if (!this.authService.isPasswordStrong(password)) {
      errors.push(ErrorMessages.PASSWORD_WEAK);
    }
  }

  async checkUserExistence(email: string, errors: ErrorMessages[]) {
    const existingUser = await this.userService.findOneByEmail(email);
    if (existingUser) {
      errors.push(ErrorMessages.EMAIL_EXISTS);
      throw new ConflictException(errors);
    }
  }
}
