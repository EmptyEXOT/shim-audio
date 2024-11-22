import { Test, TestingModule } from '@nestjs/testing';
import { ValidationService } from './validation.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/auth/auth.service';

// Моки для модулей
const mockJwtModule = {
  provide: JwtService,
  useValue: {
    sign: jest.fn(),
    verify: jest.fn(),
  },
};

const mockUserModule = {
  provide: UserService,
  useValue: {
    findUser: jest.fn().mockResolvedValue(null), // Мок метода findUser
    // Другие методы, если нужно
  },
};

const mockAuthModule = {
  provide: AuthService,
  useValue: {
    validateUser: jest.fn().mockResolvedValue(true), // Мок метода validateUser
    // Другие методы, если нужно
  },
};

describe('ValidationService', () => {
  let service: ValidationService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ValidationService,
        mockJwtModule,
        mockUserModule,
        mockAuthModule,
      ],
    }).compile();

    service = module.get<ValidationService>(ValidationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
