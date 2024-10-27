import { Button } from '@/shared/component/button/ui/Button';
import { FC, useState } from 'react';
import { useLoginMutation } from '../api/auth.api';

export interface LoginFormProps {}

interface FormState {
  email: string;
  password: string;
}

export const LoginForm: FC<LoginFormProps> = () => {
  const [formState, setFormState] = useState<FormState>({
    email: '',
    password: '',
  });

  const [login, { isLoading }] = useLoginMutation();

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) =>
    setFormState((prev) => ({ ...prev, [name]: value }));

  const onSubmit = async () => {
    try {
      console.log('req');
      await login(formState).unwrap();
      console.log('success');
    } catch (err) {
      console.log({
        status: 'error',
        title: 'Error',
        description: 'Oh no, there was an error!',
        isClosable: true,
      });
    }
  };

  return (
    <div className='flex flex-col gap-4 max-w-xl'>
      <input
        className='outline'
        type='email'
        onChange={handleChange}
        name='email'
      />
      <input
        className='outline'
        type='password'
        onChange={handleChange}
        name='password'
      />
      <Button onClick={onSubmit}>{isLoading ? 'loading' : 'submit'}</Button>
    </div>
  );
};
