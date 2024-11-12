import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthTokens } from 'src/auth/types/AuthTokens.type';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { UAParser } from 'ua-parser-js';
import { UpdateSessionDto } from './dto/update-session.dto';
import { ClientSession } from './entities/session.entity';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(ClientSession)
    private sessionRepository: Repository<ClientSession>,
    private userService: UsersService,
  ) {}

  async create(user: User, userAgent: string, tokens: AuthTokens) {
    const parser = new UAParser('user-agent');
    const res = parser.setUA(userAgent).getResult();

    const newSession = this.sessionRepository.create({
      user: user,
      refreshToken: tokens.refreshToken,
      browser: res.browser.name || 'unknown',
      os: res.os.name || 'unknown',
      lastActive: new Date(),
    });

    await this.sessionRepository.save(newSession);
    return newSession;
  }

  findAll() {
    return `This action returns all session`;
  }

  async findOne(id: number) {
    return await this.sessionRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async setRefreshToken(sessionId: number, refreshToken: string) {
    const session = await this.sessionRepository.findOneBy({ id: sessionId });
    session.refreshToken = refreshToken;

    await this.sessionRepository.save(session);
    return session;
  }

  async findAllByUserId(id: number) {
    const user = await this.userService.findOne(id);
    return await this.sessionRepository.find({
      where: { user: { id: user.id } },
    });
  }

  update(id: number, updateSessionDto: UpdateSessionDto) {
    return `This action updates a #${id} session`;
  }

  async remove(id: number) {
    return await this.sessionRepository.delete({ id });
  }
}
