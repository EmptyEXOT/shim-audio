import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { ErrorMessages } from 'src/shared/enums/error-messages.enum';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  // RolesGuard (Admin, Moderator etc...)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Получить всех пользователей',
    description: 'Требуется роль: Админ',
  })
  @ApiForbiddenResponse({
    description: 'Доступ запрещен',
  })
  @ApiUnauthorizedResponse({
    description: 'Необходима аутентификация',
  })
  @ApiOkResponse({ description: 'Список всех пользователей', type: [User] })
  @Get()
  // @UseGuards(JWTAuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  // RolesGuard (Admin, Moderator etc...)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Удалить пользователя',
    description: 'Требуется роль: Админ',
  })
  @ApiForbiddenResponse({
    description: 'Доступ запрещен',
  })
  @ApiUnauthorizedResponse({
    description: 'Необходима аутентификация',
  })
  @ApiNotFoundResponse({
    description: 'Пользователь с таким id не найден',
  })
  @ApiOkResponse({ description: 'Список всех пользователей', type: User })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const candidate = await this.usersService.findOne(+id);
    if (!candidate) {
      throw new NotFoundException(ErrorMessages.USER_NOT_FOUND);
    }
    return this.usersService.remove(candidate);
  }
}
