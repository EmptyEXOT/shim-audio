import clsx from 'clsx';
import { FC, ReactNode } from 'react';

export interface SkeletonBaseProps {
  children: ReactNode;
}

export const SkeletonBase: FC<SkeletonBaseProps> = (props) => {
  return (
    <div className={clsx('animate-pulse container mx-auto')}>
      {props.children}
    </div>
  );
};
