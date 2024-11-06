import { ResponseDto } from 'src/types/Response.dto';

export class DeleteResponseDto extends ResponseDto {
  removedSessionId: number;
}
