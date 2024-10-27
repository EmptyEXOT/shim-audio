import { useContext } from 'react';
import { ReduceThemeContext } from '../context/ReduceTheme.contex';

export const useThemeDispatch = () => {
  return useContext(ReduceThemeContext);
};
