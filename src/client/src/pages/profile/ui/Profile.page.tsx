import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

export interface ProfilePageProps {
  children?: ReactNode;
}

const ProfilePage: FC<ProfilePageProps> = (props) => {
  return (
    <div className='container mx-auto h-full'>
      <h1>Profile Page</h1>
      <div className='flex outline'>
        <div className='flex flex-col p-4 border-e border-solid border-e-black'>
          <Link to='/profile'>Profile</Link>
          <Link to='/profile/sessions'>Sessions</Link>
        </div>
        <div className='p-4 w-full'>
          {props.children}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
