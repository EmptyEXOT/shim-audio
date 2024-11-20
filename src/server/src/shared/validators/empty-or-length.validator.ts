import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { ErrorMessages } from '../enums/error-messages.enum';

export function IsNotEmptyAndLength(
  min: number,
  max: number,
  emptyMessage: ErrorMessages,
  lengthMessage: ErrorMessages,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isNotEmptyAndLength',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [min, max], // Для минимальной и максимальной длины
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (value === null || value === undefined || value === '') {
            return false;
          }
          const [minLength, maxLength] = args.constraints;
          return (
            typeof value === 'string' &&
            value.length >= minLength &&
            value.length <= maxLength
          );
        },
        defaultMessage(args: ValidationArguments) {
          if (
            args.value === null ||
            args.value === undefined ||
            args.value === ''
          ) {
            return emptyMessage;
          }
          return lengthMessage;
        },
      },
    });
  };
}
