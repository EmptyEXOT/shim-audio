import { IsEmail, IsString } from 'class-validator';

export class CreateSessionDto {
  @IsEmail()
  userEmail: string;

  @IsString()
  refreshToken: string;

  @IsString()
  userAgent: string;
}
