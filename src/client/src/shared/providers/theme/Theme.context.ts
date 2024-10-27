import { createContext } from 'react';
import { ETheme } from './types/Theme.enum';

export const ThemeContext = createContext<ETheme>(ETheme.Light);
