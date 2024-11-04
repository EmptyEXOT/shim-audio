import { FormInput } from '@/shared/component/form_input/ui/FormInput';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../api/auth.api';
import { LoginFormInputs } from '../types/LoginFormInputs.interface';
import { ErrorMessage } from './LoginForm.ErrorMessage';

export interface LoginFormProps {}

export const LoginForm: FC<LoginFormProps> = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<LoginFormInputs>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });
  const [login, { isLoading }] = useLoginMutation();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (
    data: LoginFormInputs
  ) => {
    try {
      await login(data).unwrap();
      navigate('/profile');
    } catch (e) {
      setError('root', {
        type: 'Unauthorized',
        message: 'Incorrect login or password',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3'>
      <FormInput<LoginFormInputs>
        className='outline'
        label='email'
        control={control}
        name='email'
        rules={{ required: true }}
      />
      <FormInput<LoginFormInputs>
        className='outline'
        label='password'
        control={control}
        name='password'
        type='password'
        rules={{ required: true }}
      />
      {errors.root && (
        <ErrorMessage
          message={errors.root.message || 'Неверный логин или пароль'}
        />
      )}
      <input type='submit' disabled={isLoading} />
    </form>
  );
};
