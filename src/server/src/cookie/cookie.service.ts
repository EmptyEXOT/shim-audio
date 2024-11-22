import { Injectable } from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { Cookies } from 'src/shared/enums/cookies.enum';

@Injectable()
export class CookieService {
  setRefreshToken(response: ExpressResponse, token: string) {
    response.cookie(Cookies.REFRESH_TOKEN, token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'lax',
      secure: false,
    });
  }

  clearRefreshToken(response: ExpressResponse) {
    response.clearCookie(Cookies.REFRESH_TOKEN, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'lax',
      secure: false,
    });
  }
}
