import { emptySplitApi } from '@/shared/store/api/emptySplitApi';
import { GetSessionsApiResponse } from '../types/GetSessionsApiResponse.type';

export const getSessionsApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getSessions: builder.query<GetSessionsApiResponse, number>({
      query: (id) => ({
        url: `session/user/${id}`,
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetSessionsQuery } = getSessionsApi;
