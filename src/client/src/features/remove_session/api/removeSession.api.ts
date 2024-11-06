import { emptySplitApi } from '@/shared/store/api/emptySplitApi';
import { RemoveSessionApiResponse } from '../types/RemoveSessionApiResponse.interface';

export const removeSessionApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    removeSession: builder.mutation<RemoveSessionApiResponse, number>({
      query: (id) => ({
        url: `session/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useRemoveSessionMutation } = removeSessionApi;
