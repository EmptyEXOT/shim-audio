import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { ClientSession } from './entities/session.entity';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [SessionController],
  providers: [SessionService],
  imports: [
    TypeOrmModule.forFeature([ClientSession]),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
  ],
  exports: [TypeOrmModule, SessionService],
})
export class SessionModule {}
