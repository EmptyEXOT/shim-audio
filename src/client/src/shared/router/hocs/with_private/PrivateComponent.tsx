import { ReactNode } from 'react';
import { Navigate, useLoaderData } from 'react-router-dom';

export const PrivateComponent = ({
  children,
  redirect,
}: {
  children: ReactNode;
  redirect: string;
}) => {
  const res = useLoaderData();
  return res ? children : <Navigate to={redirect} />;
};
