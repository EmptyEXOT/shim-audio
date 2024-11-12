import { IsEmail, IsString } from 'class-validator';
import { RefreshToken } from 'src/refresh-token/entities/refresh-token.entity';

export class CreateSessionDto {
  @IsEmail()
  userEmail: string;

  @IsString()
  refreshToken: string;

  @IsString()
  userAgent: string;
}
