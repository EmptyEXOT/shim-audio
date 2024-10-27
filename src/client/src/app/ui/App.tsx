import { ThemeProvider } from '@/shared/providers/theme/';
import { Navbar } from '@/widgets/navbar';
import { FC, ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeToggle } from '@/features/ToggleTheme';

export interface AppProps {
  children?: ReactNode;
}

export const App: FC<AppProps> = (props) => {
  return (
    <ThemeProvider>
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
          </Navbar.Base>
        </Navbar>
        {props.children}
        <Outlet />
      </div>
    </ThemeProvider>
  );
};
