import { FC, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { useToggle } from '../hooks/useToggle';

export interface ToggleBaseProps {
  children: ReactNode;
  colors?: Partial<{
    active: string;
    inactive: string;
  }>;
}

export const Base: FC<ToggleBaseProps> = (props) => {
  const { id, isActive } = useToggle();

  return (
    <label
      htmlFor={id}
      className={twMerge(
        'cursor-pointer flex items-center justify-between w-12 h-6 rounded-full p-1 transition-transform duration-300 ease-in-out',
        props.colors?.inactive || 'bg-gray-300',
        isActive && (props.colors?.active || 'bg-blue-500')
      )}
    >
      {props.children}
    </label>
  );
};
