import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { ErrorMessages } from 'src/shared/enums/error-messages.enum';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException(ErrorMessages.INCORRECT_CREDENTIALS);
    } else if (!user.isActive) {
      throw new UnauthorizedException(ErrorMessages.USER_NOT_ACTIVATED);
    }
    return user;
  }
}
