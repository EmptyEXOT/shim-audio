import { Controller } from '@nestjs/common';
import { CookieService } from './cookie.service';

@Controller('cookie')
export class CookieController {
  constructor(private readonly cookieService: CookieService) {}
}
