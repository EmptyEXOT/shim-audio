import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

export interface ProfilePageProps {
  children?: ReactNode;
}

const ProfilePage: FC<ProfilePageProps> = (props) => {
  return (
    <div className='container mx-auto'>
      <h1>Profile Page</h1>
      <Link to='/profile/sessions'>Sessions!!!</Link>
      {props.children}
      <Outlet />
    </div>
  );
};

export default ProfilePage;
