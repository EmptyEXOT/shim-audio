import { createContext, Dispatch } from 'react';
import { ThemeAction } from '../types/ThemeAction.interface';

export const ReduceThemeContext = createContext<Dispatch<ThemeAction>>(
  () => null
);
