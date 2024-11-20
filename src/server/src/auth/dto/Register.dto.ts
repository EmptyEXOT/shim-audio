import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { ErrorMessages } from 'src/shared/enums/error-messages.enum';
import { IsNotEmptyAndLength } from 'src/shared/validators/empty-or-length.validator';

export class RegisterRequestDto {
  @ApiProperty({ type: 'string', example: 'Tom' })
  @IsNotEmptyAndLength(
    2,
    50,
    ErrorMessages.FNAME_EMPTY,
    ErrorMessages.FNAME_LENGTH,
  )
  fname: string;

  @ApiProperty({ type: 'string', example: 'Black' })
  @IsNotEmptyAndLength(
    2,
    50,
    ErrorMessages.SNAME_EMPTY,
    ErrorMessages.SNAME_LENGTH,
  )
  sname: string;

  @ApiProperty({ type: 'string', example: 'tomblack@gmail.com' })
  @IsEmail({}, { message: ErrorMessages.EMAIL_INVALID })
  @IsNotEmptyAndLength(
    8,
    128,
    ErrorMessages.EMAIL_EMPTY,
    ErrorMessages.EMAIL_LENGTH,
  )
  email: string;

  @ApiProperty({ type: 'string', example: 'qwerty123' })
  @ApiProperty()
  @IsNotEmptyAndLength(
    8,
    24,
    ErrorMessages.PASSWORD_EMPTY,
    ErrorMessages.PASSWORD_LENGTH,
  )
  password: string;
}
