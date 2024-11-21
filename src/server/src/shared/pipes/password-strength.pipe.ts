import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { ErrorMessages } from '../enums/error-messages.enum';

@Injectable()
export class PasswordStrengthPipe<
  T extends { password: string; errors: ErrorMessages[] } = any,
> implements PipeTransform
{
  constructor(private authService: AuthService) {}
  transform(dto: T): T {
    if (!this.authService.isPasswordStrong(dto.password)) {
      throw new BadRequestException(ErrorMessages.PASSWORD_WEAK);
    }
    return dto;
  }
}
