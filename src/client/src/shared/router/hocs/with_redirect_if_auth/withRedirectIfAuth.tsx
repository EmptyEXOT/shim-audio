import { ReactNode } from 'react';
import { RedirectIfAuth } from './RedirectIfAuth';

export const withRedirectIfAuth = (children: ReactNode, to: string) => {
  return <RedirectIfAuth to={to}>{children}</RedirectIfAuth>;
};
