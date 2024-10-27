import { FC, memo, ReactNode } from 'react';

export interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
}

export const Button: FC<ButtonProps> = memo(
  ({ children, disabled = false, onClick, className }) => {
    return (
      <button onClick={onClick} disabled={disabled} className={className}>
        {children}
      </button>
    );
  }
);
