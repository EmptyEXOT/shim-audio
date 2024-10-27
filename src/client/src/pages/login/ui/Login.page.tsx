import { LoginForm } from '@/features/auth/ui/LoginForm';
import { FC } from 'react';

export interface LoginPageProps {}

const LoginPage: FC<LoginPageProps> = () => {
  return (
    <div className='container mx-auto'>
      <h1>Login page</h1>
      <div className='flex justify-center'>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
