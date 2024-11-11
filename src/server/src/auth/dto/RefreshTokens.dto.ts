import { IsEmail, IsNumber, IsString } from 'class-validator';
import { ResponseDto } from 'src/types/Response.dto';

export class RefreshTokensResponseDto extends ResponseDto {
  @IsString()
  accessToken: string;

  @IsNumber()
  sessionId: number;

  @IsEmail()
  email: string;

  @IsNumber()
  userId: number;
}
