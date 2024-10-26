import { Toggle } from '@/shared/component/toggle';
import { FC, useCallback, useId, useState } from 'react';

export interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const onClick = useCallback(() => {
    setIsActive((prev) => !prev);
  }, []);

  return (
    <div>
      <h1 className='text-white'>Home page</h1>
      <Toggle name='test toggle' isActive={isActive} onToggle={onClick} />
    </div>
  );
};

export default HomePage;
