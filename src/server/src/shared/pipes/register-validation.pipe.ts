import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { RegisterRequestDto } from 'src/auth/dto/Register.dto';
import { UserService } from 'src/user/user.service';
import { ErrorMessages } from '../enums/error-messages.enum';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class RegisterValidationPipe implements PipeTransform {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  async transform(value: any) {
    const dto = plainToClass(RegisterRequestDto, value);

    const validationErrors = await validate(dto);
    const errors = validationErrors
      .map((err) => Object.values(err.constraints))
      .flat();

    const existingUser = await this.userService.findOneByEmail(dto.email);
    if (existingUser) {
      errors.push(ErrorMessages.EMAIL_EXISTS);
    }

    if (!this.authService.isPasswordStrong(dto.password)) {
      errors.push(ErrorMessages.PASSWORD_WEAK);
    }

    if (errors.length) {
      throw new BadRequestException(errors);
    }

    return dto;
  }
}
