import { FC } from 'react';
import { SkeletonBox } from './Skeleton.Box';

export interface SkeletonProps {}

type SkeletonCompose = FC<SkeletonProps> & {
  Box: typeof SkeletonBox;
};

const BaseSkeleton: FC<SkeletonProps> = () => {
  return <div></div>;
};

const ComposedSkeleton = BaseSkeleton as SkeletonCompose;

ComposedSkeleton.Box = SkeletonBox;

export const Skeleton = ComposedSkeleton;
