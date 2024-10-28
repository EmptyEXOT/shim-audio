import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { compareSync } from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities/user.entity';

jest.mock('bcryptjs', () => ({
  compareSync: jest.fn(),
}));

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: UsersService,
          useValue: {
            findOneByEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
  });

  it('should validate user if credentials are valid', async () => {
    const email = 'test@example.com';
    const password = 'password';
    const mockUser: Pick<User, 'email' | 'password'> = {
      email,
      password,
    };

    userService.findOneByEmail = jest.fn().mockResolvedValue(mockUser);
    (compareSync as jest.Mock).mockReturnValue(true);

    const result = await authService.validateUser(email, password);

    expect(userService.findOneByEmail).toHaveBeenCalledWith(email);
    expect(result).toEqual({ email }); // without password
    expect(compareSync).toHaveBeenCalledWith(password, mockUser.password);
  });
});
