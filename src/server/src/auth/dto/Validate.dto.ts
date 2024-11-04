import { IsBoolean } from 'class-validator';
import { ResponseDto } from 'src/types/Response.dto';

export class ValidateResponseDto extends ResponseDto {
  @IsBoolean()
  isValid: boolean;
}
