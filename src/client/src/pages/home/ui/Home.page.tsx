import { Skeleton } from '@/shared/component/skeleton';
import { FC } from 'react';

export interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
  return (
    <div className='container mx-auto'>
      <h1 className='dark:text-lime-50'>Home page</h1>
    </div>
  );
};

export default HomePage;
