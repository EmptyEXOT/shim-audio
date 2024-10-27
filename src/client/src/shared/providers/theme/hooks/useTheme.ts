import { useContext } from 'react';
import { ThemeContext } from '../Theme.context';

export const useTheme = () => {
  return useContext(ThemeContext);
};
