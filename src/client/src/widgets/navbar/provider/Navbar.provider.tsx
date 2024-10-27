import { FC, ReactNode, useReducer } from 'react';
import { NavbarContext } from '../context/Navbar.context';
import { navbarReducer } from '../reducer/Navbar.reducer';
import { ReduceNavbarContext } from '../context/ReduceNavbar.context';

export interface NavbarProviderProps {
  children: ReactNode;
}

export const NavbarProvider: FC<NavbarProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(navbarReducer, { isOpen: false });
  return (
    <NavbarContext.Provider value={state}>
      <ReduceNavbarContext.Provider value={dispatch}>
        {children}
      </ReduceNavbarContext.Provider>
    </NavbarContext.Provider>
  );
};
