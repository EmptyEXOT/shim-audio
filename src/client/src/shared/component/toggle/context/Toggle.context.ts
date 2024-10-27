import { createContext } from 'react';
import { ToggleContextType } from '../types/ToggleContextType.interface';

export const ToggleContext = createContext<ToggleContextType>({
  id: 'default_toggle_id',
  isActive: false,
  onToggle: () => {},
});
