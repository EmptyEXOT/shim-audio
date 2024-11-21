import { Injectable, PipeTransform } from '@nestjs/common';
import { ValidationService } from 'src/validation/validation.service';

@Injectable()
export class RegisterConfirmationPipe implements PipeTransform<string> {
  constructor(private readonly validationService: ValidationService) {}
  async transform(token: string) {
    this.validationService.validateToken(token);
    return token;
  }
}
