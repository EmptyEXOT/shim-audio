import { forwardRef, Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientSession } from './entities/session.entity';
import { RefreshTokenModule } from 'src/refresh-token/refresh-token.module';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [SessionController],
  providers: [SessionService, UsersService],
  imports: [
    TypeOrmModule.forFeature([ClientSession]),
    forwardRef(() => RefreshTokenModule),
    forwardRef(() => UsersModule),
  ],
  exports: [TypeOrmModule],
})
export class SessionModule {}
