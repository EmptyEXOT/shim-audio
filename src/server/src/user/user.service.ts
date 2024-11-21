import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcryptjs';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: Partial<User>) {
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
    return await this.userRepository.findOneBy({ email });
  }

  async findOne(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  async remove(user: User) {
    return await this.userRepository.delete({ id: user.id });
  }

  async confirm(user: User) {
    return await this.userRepository.save({
      ...user,
      isActive: true,
    });
  }
}
