import { FC, memo, useId, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ToggleProps {
  name: string;
  isActive: boolean;
  onToggle: () => void;
}

export const Toggle: FC<ToggleProps> = memo((props) => {
  const id = useId();

  return (
    <>
      <input
        type='checkbox'
        name={props.name}
        id={id}
        className='hidden'
        checked={props.isActive}
        onChange={props.onToggle}
      />
      <label
        htmlFor={id}
        className={twMerge(
          'cursor-pointer flex items-center justify-between w-12 h-6 bg-gray-300 rounded-full p-1 transition-transform duration-300 ease-in-out',
          props.isActive && 'bg-blue-500'
        )}
      >
        <span
          className={`w-4 h-4 bg-white rounded-full shadow-md transform transition duration-300 ease-in-out ${props.isActive ? 'translate-x-6' : 'translate-x-0'}`}
        />
      </label>
    </>
  );
});
