import { FC } from 'react';
import cls from './App.module.css';
import clsx from 'clsx';
import '../index';

export interface AppProps {}

export const App: FC<AppProps> = () => {
  return (
    <div className={clsx(cls.app)}>
      <h1 className='text-4xl text-white'>Test</h1>
    </div>
  );
};
