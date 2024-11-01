import { FormInput } from '@/shared/component/form_input/ui/FormInput';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLoginMutation } from '../api/auth.api';
import { ErrorMessage } from './LoginForm.ErrorMessage';
import { useCookies } from 'react-cookie';
import { COOKIE } from '@/shared/const/cookies.const';

export interface LoginFormProps {}

interface FormInputs {
  email: string;
  password: string;
}

export const LoginForm: FC<LoginFormProps> = () => {
  const [_, setCookie] = useCookies();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<FormInputs>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      const { accessToken, email, sessionId } = await login(data).unwrap();
      setCookie(COOKIE.ACCESS_TOKEN, accessToken);
      setCookie(COOKIE.EMAIL, email);
      setCookie(COOKIE.SESSION_ID, sessionId);
    } catch (e) {
      setError('root', {
        type: 'Unauthorized',
        message: 'Incorrect login or password',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3'>
      <FormInput<FormInputs>
        className='outline'
        label='email'
        control={control}
        name='email'
        rules={{ required: true }}
      />
      <FormInput<FormInputs>
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
