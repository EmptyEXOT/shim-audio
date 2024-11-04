import { IsObject } from 'class-validator';

export class ResponseDto {
  statusCode: number;

  @IsObject()
  error?: any;
}
