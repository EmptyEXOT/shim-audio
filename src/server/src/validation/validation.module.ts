import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { ValidationService } from './validation.service';

@Module({
  providers: [ValidationService],
  imports: [UserModule, forwardRef(() => AuthModule)],
  exports: [ValidationService],
})
export class ValidationModule {}
