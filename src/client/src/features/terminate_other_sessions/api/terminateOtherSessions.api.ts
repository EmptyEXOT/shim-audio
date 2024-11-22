import { emptySplitApi } from '@/shared/store/api/emptySplitApi';
import { TerminateOtherSessionsResponse } from '../types/Logout.api.types';

export const terminateOtherSessionsApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    terminateOtherSessions: builder.mutation<
      TerminateOtherSessionsResponse,
      number
    >({
      query: (id) => ({
        url: `session/terminateOther/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useTerminateOtherSessionsMutation } = terminateOtherSessionsApi;
