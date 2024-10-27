import { FC, memo, NamedExoticComponent, ReactNode, useId } from 'react';
import { ToggleContext } from '../context/Toggle.context';
import { ToggleBase } from './Toggle.Base';
import { ToggleHandler } from './Toggle.Handler';

export interface ToggleProps {
  name: string;
  isActive: boolean;
  onToggle: () => void;
  children: ReactNode;
}

type MemoizedToggleCompose = FC<ToggleProps> & {
  Base: typeof ToggleBase;
  Handler: typeof ToggleHandler;
};

const BaseToggle: FC<ToggleProps> = ({
  children,
  isActive,
  name,
  onToggle,
}) => {
  const id = useId();

  return (
    <ToggleContext.Provider value={{ id, isActive, onToggle }}>
      <input
        type='checkbox'
        name={name}
        id={id}
        className='hidden'
        checked={isActive}
        onChange={onToggle}
      />
      {children}
    </ToggleContext.Provider>
  );
};

const MemoizedToggle = memo(BaseToggle) as NamedExoticComponent<ToggleProps> &
  MemoizedToggleCompose;

MemoizedToggle.Base = ToggleBase;
MemoizedToggle.Handler = ToggleHandler;

export const Toggle = MemoizedToggle;
