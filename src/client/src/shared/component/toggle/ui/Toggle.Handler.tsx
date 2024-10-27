import { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import { useToggle } from '../hooks/useToggle';

export interface ToggleHandlerProps {
  colors?: Partial<{
    active: string;
    inactive: string;
  }>;
}

export const ToggleHandler: FC<ToggleHandlerProps> = (props) => {
  const { isActive } = useToggle();

  return (
    <span
      className={twMerge(
        'w-4 h-4 rounded-full shadow-md transform transition duration-300 ease-in-out translate-x-0',
        isActive && 'translate-x-6',
        props.colors?.inactive || 'bg-white',
        isActive && (props.colors?.active || 'bg-white')
      )}
    />
  );
};
