import { useContext } from 'react';
import { ReduceNavbarContext } from '../context/ReduceNavbar.context';

export const useNavbarDispatch = () => {
  return useContext(ReduceNavbarContext);
};
