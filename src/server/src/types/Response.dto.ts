import { HttpStatus } from '@nestjs/common';
import { IsObject } from 'class-validator';

export class ResponseDto {
  statusCode: HttpStatus;

  @IsObject()
  error?: any;
}
