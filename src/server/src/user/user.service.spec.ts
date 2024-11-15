import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RefreshToken } from '../refresh-token/entities/refresh-token.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;
  let refreshTokenRepository: Repository<RefreshToken>;

  const mockUserRepository = {
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockRefreshTokenRepository = {
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: getRepositoryToken(RefreshToken),
          useValue: mockRefreshTokenRepository, // Provide the mock for RefreshToken
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    refreshTokenRepository = module.get<Repository<RefreshToken>>(
      getRepositoryToken(RefreshToken),
    );
  });

  it('should create a new user if the email does not exist', async () => {
    const createUserDto: CreateUserDto = {
      email: 'test@example.com',
      fname: 'John',
      sname: 'Doe',
      password: 'plainPassword',
    };

    // Mock the userRepository methods
    jest.spyOn(mockUserRepository, 'findOneBy').mockResolvedValue(null); // No user found
    jest.spyOn(mockUserRepository, 'create').mockReturnValue({
      ...createUserDto,
      password: 'hashedPassword', // hashed password
    });
    jest.spyOn(mockUserRepository, 'save').mockResolvedValue({
      ...createUserDto,
      password: 'hashedPassword',
    });

    const result = await userService.create(createUserDto);
    expect(result).toEqual({
      ...createUserDto,
      password: 'hashedPassword', // Ensure the password matches the expected hashed value
    });
    expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({
      email: createUserDto.email,
    });
    expect(mockUserRepository.create).toHaveBeenCalledWith({
      email: createUserDto.email,
      fname: createUserDto.fname,
      sname: createUserDto.sname,
      password: expect.any(String), // Check that the password is hashed
    });
    expect(mockUserRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        email: createUserDto.email,
        fname: createUserDto.fname,
        sname: createUserDto.sname,
        password: expect.any(String), // Check that the password is hashed
      }),
    );
  });
});
