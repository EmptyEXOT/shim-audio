import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcryptjs';
import { UserErrorCodes } from 'src/shared/enums/error-codes.enum';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const candidate = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });

    if (candidate) {
      // http 409 status code
      throw new ConflictException(UserErrorCodes.EMAIL_EXISTS);
    }

    const hashedPassword = await hash(createUserDto.password, 12);
    const newUser = this.userRepository.create({
      email: createUserDto.email,
      fname: createUserDto.fname,
      sname: createUserDto.sname,
      password: hashedPassword,
      /* 
        a new session (on register) 
        is added in the corresponding handler
      */
      sessions: [],
      isActive: false,
    });

    await this.userRepository.save(newUser);
    return newUser;
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users;
  }

  async findOneByEmail(email: string) {
    const candidate = await this.userRepository.findOneBy({ email });
    if (!candidate) {
      throw new NotFoundException('User with such email doesnt exist');
    }
    return candidate;
  }

  async findOne(id: number) {
    const candidate = await this.userRepository.findOneBy({ id });
    if (!candidate) {
      throw new NotFoundException('User with such email doesnt exist');
    }
    return candidate;
  }

  async remove(user: User) {
    return await this.userRepository.delete({ id: user.id });
  }

  async confirm(user: User) {
    const activated = await this.userRepository.save({
      ...user,
      isActive: true,
    });
    console.log(activated);
    return activated;
  }
}
