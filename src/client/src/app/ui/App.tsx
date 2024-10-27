import { ThemeProvider } from '@/shared/providers/theme/';
import { Navbar } from '@/widgets/navbar';
import { FC, ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeToggle } from '@/features/toggle_theme';

export interface AppProps {
  children?: ReactNode;
}

export const App: FC<AppProps> = (props) => {
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
            <Navbar.Link
              className='bg-black dark:bg-white py-1.5 px-3'
              to='/login'
            >
              <p className='text-white dark:text-black'>Sign In</p>
            </Navbar.Link>
          </Navbar.Navigation>
        </Navbar.Base>
      </Navbar>
      {props.children}
      <Outlet />
    </div>
  );
};
