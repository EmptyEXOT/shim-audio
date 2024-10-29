import clsx from 'clsx';
import { FC, forwardRef, memo, useId, useState } from 'react';
import { Path, UseFormRegister } from 'react-hook-form';

interface IFormValues {
  email: string;
  password: string;
}

type InputProps = {
  label?: string;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  required?: boolean;
  type?: string;
};

export const Input = memo(
  forwardRef<HTMLInputElement, InputProps>(function Input(props, ref) {
    const id = useId();
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const onFocus = () => {
      setIsFocused(true);
    };
    const onBlur = () => {
      setIsFocused(false);
    };
    return (
      <div className='flex flex-col gap-1'>
        {props.label && (
          <label
            htmlFor={id}
            className={clsx(
              'text-xs',
              isFocused
                ? 'text-black dark:text-white'
                : 'text-neutral-500 dark:text-neutral-400'
            )}
          >
            {props.label}
          </label>
        )}
        <input
          id={id}
          className={clsx(props.className, 'bg-transparent')}
          type={props.type || 'text'}
          ref={ref}
          onChange={props.onChange}
          value={props.value}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>
    );
  })
);
