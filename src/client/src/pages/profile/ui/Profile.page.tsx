import { FC } from 'react';

export interface ProfilePageProps {}

const ProfilePage: FC<ProfilePageProps> = () => {
  return (
    <div className='container mx-auto'>
      <h1>Profile Page</h1>
      <div className='flex justify-center'>profile!!!</div>
    </div>
  );
};

export default ProfilePage;
