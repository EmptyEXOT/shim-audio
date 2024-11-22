import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthTokens } from 'src/auth/types/AuthTokens.type';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { UAParser } from 'ua-parser-js';
import { ClientSession } from './entities/session.entity';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(ClientSession)
    private sessionRepository: Repository<ClientSession>,
    private userService: UserService,
  ) {}

  async create(
    user: Omit<User, 'password'>,
    userAgent: string,
    tokens: AuthTokens,
  ) {
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

  async remove(id: number) {
    return await this.sessionRepository.delete({ id });
  }
}
