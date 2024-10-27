import { ThemeToggle } from '@/features/ToggleTheme/ui/ThemeToggle';
import { FC } from 'react';

export interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
  return (
    <div>
      <h1 className='dark:text-lime-50'>Home page</h1>
      <ThemeToggle name='theme1' />
    </div>
  );
};

export default HomePage;
