import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { RegisterRequestDto } from 'src/auth/dto/Register.dto';
import { ValidationService } from 'src/validation/validation.service';

@Injectable()
export class RegisterValidationPipe implements PipeTransform {
  constructor(private readonly validationService: ValidationService) {}
  async transform(value: any) {
    const dto = plainToClass(RegisterRequestDto, value);
    const errors = await this.validationService.validateDto(dto);
    this.validationService.validatePassword(dto.password, errors);
    await this.validationService.checkUserExistence(dto.email, errors);
    if (errors.length) throw new BadRequestException(errors);
    return dto;
  }
}