import { FC, ReactNode } from 'react';
import cls from './App.module.css';
import clsx from 'clsx';
import '../index';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '@/shared/providers/theme/ui/Theme.provider';

export interface AppProps {
  children?: ReactNode;
}

export const App: FC<AppProps> = (props) => {
  return (
    <ThemeProvider>
      <div>
        {props.children}
        <Outlet />
      </div>
    </ThemeProvider>
  );
};
