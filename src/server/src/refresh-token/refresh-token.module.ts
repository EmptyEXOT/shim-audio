import { forwardRef, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionModule } from 'src/session/session.module';
import { SessionService } from 'src/session/session.service';
import { UserModule } from 'src/user/user.module';
import { RefreshToken } from './entities/refresh-token.entity';
import { RefreshTokenController } from './refresh-token.controller';
import { RefreshTokenService } from './refresh-token.service';

@Module({
  controllers: [RefreshTokenController],
  providers: [RefreshTokenService, JwtService, SessionService],
  imports: [
    TypeOrmModule.forFeature([RefreshToken]),
    forwardRef(() => UserModule),
    forwardRef(() => SessionModule),
    // JwtModule.register({
    //   secret: JWT_SECRET,
    //   signOptions: { expiresIn: '7d' },
    // }),
  ],
})
export class RefreshTokenModule {}
