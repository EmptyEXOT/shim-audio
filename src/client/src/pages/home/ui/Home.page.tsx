import { FC } from 'react';

export interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
  return (
    <div>
      <h1 className='text-white'>Home page</h1>
    </div>
  );
};

export default HomePage;
