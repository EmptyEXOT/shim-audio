import {
  BadRequestException,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/auth/types/AuthenticatedRequest.interface';
import { ErrorMessages } from 'src/shared/enums/error-messages.enum';
import { ValidationService } from 'src/validation/validation.service';
import { DeleteResponseDto } from './dto/Delete.dto';
import { SessionService } from './session.service';

@Controller('session')
export class SessionController {
  constructor(
    private readonly sessionService: SessionService,
    private readonly validationService: ValidationService,
  ) {}

  @UseGuards(JWTAuthGuard)
  @Get('user/:id')
  async findAllByUserId(
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory: () =>
          new BadRequestException(ErrorMessages.TYPE_MUST_BE_A_NUMBER),
      }),
    )
    id: number,
    @Request() req: AuthenticatedRequest,
  ) {
    if (req.user.id !== id) {
      throw new ForbiddenException(ErrorMessages.SESSION_NO_RIGHTS);
    }
    await this.validationService.checkUserExists(id);
    return this.sessionService.findAllByUserId(+id);
  }

  @UseGuards(JWTAuthGuard)
  @Get(':id')
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory: () =>
          new BadRequestException(ErrorMessages.TYPE_MUST_BE_A_NUMBER),
      }),
    )
    id: number,
    @Request() req: AuthenticatedRequest,
  ) {
    const session = await this.sessionService.findOne(id);
    await this.validationService.checkSessionExists(session.id);
    if (req.user.id !== session.user.id) {
      throw new ForbiddenException(ErrorMessages.SESSION_NO_RIGHTS);
    }
    return session;
  }

  @UseGuards(JWTAuthGuard)
  @Delete(':id')
  async remove(
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory: () =>
          new BadRequestException(ErrorMessages.TYPE_MUST_BE_A_NUMBER),
      }),
    )
    id: number,
    @Req() request: AuthenticatedRequest,
  ): Promise<DeleteResponseDto> {
    const session = await this.sessionService.findOne(id);
    await this.validationService.checkSessionExists(session.id);
    await this.validationService.checkSessionAccess(request.user.id, session);
    await this.sessionService.remove(id);
    return {
      removedSessionId: id,
    };
  }
}
