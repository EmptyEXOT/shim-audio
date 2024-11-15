import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';
import { UserErrorCodes } from 'src/shared/enums/error-codes.enum';

export class CreateUserDto {
  @ApiProperty()
  @Length(2, 50)
  fname: string;

  @ApiProperty()
  @Length(2, 50)
  sname: string;

  @ApiProperty()
  @IsEmail()
  @Length(8, 128)
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(8, 24)
  @Matches(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/, {
    message: UserErrorCodes.PASSWORD_TOO_WEAK,
  })
  password: string;
}