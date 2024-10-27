import { useContext } from 'react';
import { ThemeContext } from '../context/Theme.context';

export const useTheme = () => {
  return useContext(ThemeContext);
};
