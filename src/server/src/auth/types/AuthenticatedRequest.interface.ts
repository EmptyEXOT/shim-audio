import { User } from 'src/user/entities/user.entity';

export interface AuthenticatedRequest extends Request {
  user: Omit<User, 'password'>;
}
