import { FormInput } from '@/shared/component/form_input/ui/FormInput';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLoginMutation } from '../api/auth.api';

export interface LoginFormProps {}

interface FormInputs {
  email: string;
  password: string;
}

export const LoginForm: FC<LoginFormProps> = () => {
  const { handleSubmit, control } = useForm<FormInputs>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      console.log('req');
      await login(data).unwrap();
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
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3'>
      <FormInput<FormInputs>
        className='outline'
        label='email'
        control={control}
        name='email'
        rules={{ required: true }}
      ></FormInput>
      <FormInput<FormInputs>
        className='outline'
        label='password'
        control={control}
        name='password'
        type='password'
        rules={{ required: true }}
      />
      {/* {errors.password && <span>This field is required</span>} */}
      <input type='submit' />
    </form>
  );
};
