import { JwtPayload } from 'src/auth/types/jwt-payload.interface';

export class CreateRefreshTokenDto {
  email: string;
  id: number;
  // sub: number;
  // token: string;
  // sessionId: number;
}
