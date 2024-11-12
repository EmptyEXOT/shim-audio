import { Controller, Delete, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // RolesGuard (Admin, Moderator etc...)
  // @UseGuards(JWTAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // Нужен ли этот эндпоинт? Если да, то кому?
  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.usersService.findOneByEmail(email);
  }

  // RolesGuard (Admin, Moderator etc...)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
