import { ReactNode } from 'react';
import { PrivateComponent } from './PrivateComponent';

export const withPrivate = (component: ReactNode, redirect: string) => {
  return <PrivateComponent redirect={redirect}>{component}</PrivateComponent>;
};
