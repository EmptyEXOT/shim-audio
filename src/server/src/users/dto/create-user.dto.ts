import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @Length(2, 50)
  fname: string;

  @Length(2, 50)
  sname: string;

  @IsEmail()
  @Length(8, 128)
  email: string;

  @IsNotEmpty()
  @Length(8, 24)
  password: string;
}
