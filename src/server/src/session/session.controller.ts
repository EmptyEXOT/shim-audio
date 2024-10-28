import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { SessionService } from './session.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';

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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sessionService.remove(+id);
  }
}
