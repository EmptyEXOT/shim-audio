import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { ClientSession } from './entities/session.entity';
import { SessionService } from './session.service';
import { DeleteResponseDto } from './dto/Delete.dto';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  create(
    @Body() createSessionDto: CreateSessionDto,
    @Headers('user-agent') userAgent: string,
  ) {
    return this.sessionService.create(createSessionDto, userAgent);
  }

  @UseGuards(JWTAuthGuard)
  @Get('user/:id')
  findAllByUserId(@Param('id') id: string) {
    return this.sessionService.findAllByUserId(+id);
  }

  @Get()
  findAll() {
    return this.sessionService.findAll();
  }

  @UseGuards(JWTAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sessionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSessionDto: UpdateSessionDto) {
    return this.sessionService.update(+id, updateSessionDto);
  }

  @UseGuards(JWTAuthGuard)
  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Req() request,
  ): Promise<DeleteResponseDto> {
    const session: ClientSession = await this.sessionService.findOne(+id);
    if (!session || session.user.id !== +request.user.id) {
      throw new ForbiddenException('У вас нет прав для удаления этой сессии');
    }
    await this.sessionService.remove(+id);
    return {
      statusCode: 200,
      removedSessionId: +id,
    };
  }
}
