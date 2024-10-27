import { useContext } from 'react';
import { NavbarContext } from '../context/Navbar.context';

export const useNavbar = () => {
  return useContext(NavbarContext);
};
