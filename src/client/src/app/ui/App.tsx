import { FC, ReactNode } from 'react';
import cls from './App.module.css';
import clsx from 'clsx';
import '../index';
import { Outlet } from 'react-router-dom';

export interface AppProps {
  children?: ReactNode;
}

export const App: FC<AppProps> = (props) => {
  return (
    <div className={clsx(cls.app)}>
      <Outlet />
    </div>
  );
};
