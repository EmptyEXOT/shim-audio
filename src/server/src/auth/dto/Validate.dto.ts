import { IsBoolean, IsNumber } from 'class-validator';
import { ResponseDto } from 'src/types/Response.dto';

export class ValidateResponseDto extends ResponseDto {
  @IsNumber()
  userId: number;

  @IsBoolean()
  isValid: boolean;
}
