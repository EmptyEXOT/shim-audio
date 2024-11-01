import { FC } from 'react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  return <span className='text-red-600'>{message}</span>;
};
