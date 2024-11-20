import { IsObject } from 'class-validator';

export class ResponseDto {
  @IsObject()
  error?: any;
}
