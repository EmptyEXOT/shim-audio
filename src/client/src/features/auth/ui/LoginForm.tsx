import { Button } from '@/shared/component/button/ui/Button';
import { FC, useState } from 'react';
import { useLoginMutation } from '../api/auth.api';
import { SubmitHandler, useForm } from 'react-hook-form';

export interface LoginFormProps {}

interface FormInputs {
  email: string;
  password: string;
}

export const LoginForm: FC<LoginFormProps> = () => {
  const [formState, setFormState] = useState<FormInputs>({
    email: '',
    password: '',
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>();
  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
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
  console.log(watch('email'));

  const [login, { isLoading }] = useLoginMutation();

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) =>
    setFormState((prev) => ({ ...prev, [name]: value }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3'>
      <input className='outline' defaultValue='test' {...register('email')} />
      <input
        className='outline'
        {...register('password', { required: true })}
      />
      {errors.password && <span>This field is required</span>}
      <input type='submit' />
    </form>
  );
};
