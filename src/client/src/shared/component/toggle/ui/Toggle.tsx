import { FC, memo, NamedExoticComponent, ReactNode, useId } from 'react';
import { ToggleContext } from '../context/Toggle.context';
import { Base } from './Toggle.Base';
import { Handler } from './Toggle.Handler';

export interface ToggleProps {
  name: string;
  isActive: boolean;
  onToggle: () => void;
  children: ReactNode;
}

type MemoizedToggleCompose = FC<ToggleProps> & {
  Base: typeof Base;
  Handler: typeof Handler;
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

MemoizedToggle.Base = Base;
MemoizedToggle.Handler = Handler;

export const Toggle = MemoizedToggle;
