import { FC, ReactNode } from 'react';
import { NavbarProvider } from '../provider/Navbar.provider';
import { NavbarBase } from './Navbar.Base';
import { NavbarLink } from './Navbar.Link';
import { NavbarNavigation } from './Navbar.Navigation';
import clsx from 'clsx';

export interface NavbarProps {
  children: ReactNode;
  className?: string;
}

type NavbarCompose = FC<NavbarProps> & {
  Base: typeof NavbarBase;
  Link: typeof NavbarLink;
  Navigation: typeof NavbarNavigation;
};

const BaseNavbar: FC<NavbarProps> = ({ children, className }) => {
  return (
    <NavbarProvider>
      <div
        className={clsx(
          'w-screen border-b border-solid border-b-slate-500 absolute top-0',
          className
        )}
      >
        {children}
      </div>
    </NavbarProvider>
  );
};

const ComposedNavbar = BaseNavbar as NavbarCompose;

ComposedNavbar.Base = NavbarBase;
ComposedNavbar.Link = NavbarLink;
ComposedNavbar.Navigation = NavbarNavigation;

export const Navbar = ComposedNavbar;
