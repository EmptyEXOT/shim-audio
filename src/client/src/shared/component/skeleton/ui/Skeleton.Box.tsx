import { FC } from 'react';
import { SkeletonBase } from './Skeleton.Base';

export interface SkeletonBoxProps {
  height: string;
  width: string;
}

export const SkeletonBox: FC<SkeletonBoxProps> = (props) => {
  return (
    <SkeletonBase>
      <div
        className={`h-${props.height} bg-gray-200 dark:bg-gray-700 w-${props.width} mb-4`}
        style={{
          height: props.height,
          width: props.width,
        }}
      />
    </SkeletonBase>
  );
};
