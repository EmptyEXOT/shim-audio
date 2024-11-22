import { Injectable, PipeTransform } from '@nestjs/common';
import { ValidationService } from 'src/validation/validation.service';

@Injectable()
export class RegisterConfirmationPipe implements PipeTransform<string> {
  constructor(private readonly validationService: ValidationService) {}
  async transform(token: string) {
    const errors = this.validationService.validateToken(token, 'ACCESS_TOKEN');

    // Когда будет страница с ошибкой подтверждения, нужно будет заменить на это:
    // const errors = this.validationService.validateToken(token, [], false);

    if (errors.length) {
      // TODO: редирект на страницу с ошибкой подтверждения (на нашем домене)
    }

    return token;
  }
}
