import { IsEmail } from 'class-validator';
import { RefreshToken } from 'src/refresh-token/entities/refresh-token.entity';

export class CreateSessionDto {
  @IsEmail()
  userEmail: string;
  refreshToken: string;
}
