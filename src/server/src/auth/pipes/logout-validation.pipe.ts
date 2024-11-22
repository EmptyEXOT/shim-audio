import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ValidationService } from 'src/validation/validation.service';
import { LogoutRequestDto } from '../dto/Logout.dto';

@Injectable()
export class LogoutValidationPipe implements PipeTransform {
  constructor(private readonly validationService: ValidationService) {}
  async transform(value: any) {
    const dto = plainToClass(LogoutRequestDto, value);
    const errors = await this.validationService.validateDto(dto, [], false);
    await this.validationService.checkSessionExists(
      dto.sessionId,
      errors,
      true,
    );
    // await this.validationService.checkUserExists(req.user.id, [], true);
    if (errors.length) throw new BadRequestException(errors);
    return dto;
  }
}
