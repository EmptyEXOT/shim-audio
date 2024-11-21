import { ConflictException, Injectable, PipeTransform } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { ErrorMessages } from '../enums/error-messages.enum';

@Injectable()
export class EmailExistsPipe<T extends { email: string } = any>
  implements PipeTransform
{
  constructor(private readonly userService: UserService) {}

  async transform(dto: T): Promise<T> {
    const candidate = await this.userService.findOneByEmail(dto.email);

    if (candidate) {
      throw new ConflictException(ErrorMessages.EMAIL_EXISTS);
    }

    return dto;
  }
}
