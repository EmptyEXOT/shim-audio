import { useContext } from 'react';
import { ReduceThemeContext } from '../ReduceTheme.contex';

export const useThemeDispatch = () => {
  return useContext(ReduceThemeContext);
};
