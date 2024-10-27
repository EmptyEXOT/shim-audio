import { createApi } from '@reduxjs/toolkit/query/react';
import { baseFetch } from './baseFetch';

export const emptySplitApi = createApi({
  baseQuery: baseFetch,
  endpoints: () => ({}),
});
