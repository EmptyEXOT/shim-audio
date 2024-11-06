import { FC, ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

export interface UserPageProps {
  children?: ReactNode;
}

const UserPage: FC<UserPageProps> = (props) => {
  return (
    <div className='container mx-auto'>
      <h1>User Page</h1>
      {props.children}
      <Outlet />
    </div>
  );
};

export default UserPage;
