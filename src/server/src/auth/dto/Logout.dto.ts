import { IsInt } from 'class-validator';

export class LogoutRequestDto {
  @IsInt()
  sessionId: number;
}
