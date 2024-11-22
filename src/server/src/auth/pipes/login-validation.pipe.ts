import { Injectable, PipeTransform } from '@nestjs/common';
import { ValidationService } from 'src/validation/validation.service';
import { AuthenticatedRequest } from '../types/AuthenticatedRequest.interface';

@Injectable()
export class LoginValidationPipe implements PipeTransform {
  constructor(private readonly validationService: ValidationService) {}
  async transform(req: AuthenticatedRequest) {
    // await this.validationService.checkUserExists(req.user.id, [], true);
    return req;
  }
}
