import clsx from 'clsx';
import { FC, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

export interface NavbarLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
}

export const NavbarLink: FC<NavbarLinkProps> = ({
  to,
  children,
  className,
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive, isPending, isTransitioning }) =>
        clsx(
          isPending ? 'pending' : '',
          isActive ? 'active' : '',
          isTransitioning ? 'transitioning' : '',
          className
        )
      }
    >
      {children}
    </NavLink>
  );
};
