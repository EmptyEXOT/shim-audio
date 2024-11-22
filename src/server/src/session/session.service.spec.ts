import { Test, TestingModule } from '@nestjs/testing';
import { SessionService } from './session.service';
import { UserService } from 'src/user/user.service';
import { ClientSession } from './entities/session.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockRepository = {
  findOne: jest.fn(),
};

const mockUserService = {
  findOneByEmail: jest.fn(),
};

describe('SessionService', () => {
  let service: SessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SessionService,
        { provide: UserService, useValue: mockUserService },
        {
          provide: getRepositoryToken(ClientSession),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<SessionService>(SessionService);
  });

  it('should be defined', async () => {
    await expect(service).toBeDefined();
  });
});
