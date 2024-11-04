import { FC, ReactNode } from 'react';
import { Navigate, useLoaderData } from 'react-router-dom';

interface RedirectIfAuth {
  to: string;
  children: ReactNode;
}

export const RedirectIfAuth: FC<RedirectIfAuth> = ({ to, children }) => {
  const isRedirect = useLoaderData();
  if (isRedirect) return <Navigate to={to} />;

  return <>{children}</>;
};
