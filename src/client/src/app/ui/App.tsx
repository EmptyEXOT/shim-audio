import { ThemeProvider } from '@/shared/providers/theme/';
import { Navbar } from '@/widgets/navbar';
import { FC, ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeToggle } from '@/features/toggle_theme';
import {
  useLoginMutation,
  useValidateQuery,
} from '@/features/auth/api/auth.api';
import { Skeleton } from '@/shared/component/skeleton';
import { useAppSelector } from '@/shared/store/hooks/hooks';
import { authSelector } from '@/features/auth/selectors/auth.selector';

export interface AppProps {
  children?: ReactNode;
}

export const App: FC<AppProps> = (props) => {
  const { data, isError, isLoading } = useValidateQuery({});
  const { email } = useAppSelector(authSelector);
  return (
    <div className='pt-12'>
      <Navbar>
        <Navbar.Base>
          <Navbar.Navigation>
            <Navbar.Link className='py-3' to='/'>
              <p className='text-black dark:text-white'>Home</p>
            </Navbar.Link>
            <Navbar.Link className='py-3' to='/blog'>
              <p className='text-black dark:text-white'>Blog</p>
            </Navbar.Link>
            <Navbar.Link className='py-3' to='/pads'>
              <p className='text-black dark:text-white'>Pads</p>
            </Navbar.Link>
            <Navbar.Link className='py-3' to='/news'>
              <p className='text-black dark:text-white'>News</p>
            </Navbar.Link>
          </Navbar.Navigation>

          <ThemeToggle name='theme1' />

          <Navbar.Navigation>
            {isLoading && <Skeleton.Box height='30px' width='60px' />}
            {data?.isValid && (
              <Navbar.Link
                className='bg-black dark:bg-white py-1.5 px-3'
                to='/profile'
              >
                <p className='text-white dark:text-black'>{email}</p>
              </Navbar.Link>
            )}
            {isError && (
              <Navbar.Link
                className='bg-black dark:bg-white py-1.5 px-3'
                to='/login'
              >
                <p className='text-white dark:text-black'>Sign In</p>
              </Navbar.Link>
            )}
          </Navbar.Navigation>
        </Navbar.Base>
      </Navbar>
      {props.children}
      <Outlet />
    </div>
  );
};
