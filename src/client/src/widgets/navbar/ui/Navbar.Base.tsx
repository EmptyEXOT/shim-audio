import { FC, ReactNode } from 'react';

export interface NavbarBaseProps {
  children: ReactNode;
  className?: string;
}

export const NavbarBase: FC<NavbarBaseProps> = ({ children, className }) => {
  return (
    <div className='container mx-auto flex justify-between items-center'>
      {children}
    </div>
  );
};
