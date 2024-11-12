import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { ClientSession } from './entities/session.entity';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [SessionController],
  providers: [SessionService],
  imports: [
    TypeOrmModule.forFeature([ClientSession]),
    forwardRef(() => UsersModule),
    forwardRef(() => AuthModule),
  ],
  exports: [TypeOrmModule, SessionService],
})
export class SessionModule {}
