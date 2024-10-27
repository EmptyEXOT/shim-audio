import clsx from 'clsx';
import { FC, ReactNode } from 'react';

export interface NavbarNavigationProps {
  children: ReactNode;
  className?: string;
}

export const NavbarNavigation: FC<NavbarNavigationProps> = ({
  children,
  className,
}) => {
  return <div className={clsx('flex gap-4', className)}>{children}</div>;
};
