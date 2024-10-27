import { createContext } from 'react';
import { NavbarState } from '../types/NavbarState.interface';

export const NavbarContext = createContext<NavbarState>({ isOpen: false });
