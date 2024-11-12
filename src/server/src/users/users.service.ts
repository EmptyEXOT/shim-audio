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
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
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
    return await this.userRepository.findOneBy({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return await this.userRepository.delete({ id });
  }

  async confirm(user: User) {
    const activated = await this.userRepository.save({
      ...user,
      isActive: true,
    });
    console.log(activated);
    return activated;
  }

  // async addSession(user: User, session: ClientSession) {
  //   console.log(user);
  //   const userSessions = user.sessions || [];
  //   console.log(`sessions: ${userSessions}`);
  //   userSessions.push(session);
  //   user.sessions = userSessions;
  //   await this.userRepository.save(user);
  //   return user;
  // }
}
