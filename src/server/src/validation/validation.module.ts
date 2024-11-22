import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { ValidationService } from './validation.service';
import { JwtModule } from '@nestjs/jwt';
import { SessionModule } from 'src/session/session.module';

@Module({
  providers: [ValidationService],
  imports: [
    UserModule,
    forwardRef(() => AuthModule),
    JwtModule,
    forwardRef(() => SessionModule),
  ],
  exports: [ValidationService],
})
export class ValidationModule {}
