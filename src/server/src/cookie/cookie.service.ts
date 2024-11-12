import { Injectable } from '@nestjs/common';
import { Response as ExpressResponse } from 'express';

@Injectable()
export class CookieService {
  setRefreshToken(response: ExpressResponse, token: string) {
    response.cookie('refresh_token', token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'lax',
      secure: false,
    });
  }
}
