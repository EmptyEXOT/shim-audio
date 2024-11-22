import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { RegisterRequestDto } from 'src/auth/dto/Register.dto';
import { ValidationService } from 'src/validation/validation.service';

@Injectable()
export class RegisterValidationPipe implements PipeTransform {
  constructor(private readonly validationService: ValidationService) {}
  async transform(value: any) {
    const dto = plainToClass(RegisterRequestDto, value);
    // Создание нового массива ошибок, начиная с ошибок валидации
    const errors = await this.validationService.validateDto(dto, [], false);
    // Валидация пароля на надежность
    this.validationService.validatePassword(dto.password, errors, false);
    /* 
      Валидация почтового адреса. Если существует, отправляется ошибка c 409
      статус-кодом. Ошибки предыдущих валидаторов также добавляются в ответ
    */
    await this.validationService.checkEmailBusy(dto.email, errors, true);
    // Если есть ошибки, отправляется ошибка с 400 статус-кодом
    if (errors.length) throw new BadRequestException(errors);
    return dto;
  }
}
