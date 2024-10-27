import { createContext, Dispatch } from 'react';
import { NavbarAction } from '../types/NavbarAction.interface';

export const ReduceNavbarContext = createContext<Dispatch<NavbarAction>>(
  () => null
);
