import { useContext } from 'react';
import { ToggleContext } from '../context/Toggle.context';

export const useToggle = () => {
  return useContext(ToggleContext);
};
