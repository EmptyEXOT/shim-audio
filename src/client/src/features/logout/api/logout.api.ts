import { emptySplitApi } from '@/shared/store/api/emptySplitApi';
import { LogoutRequest, LogoutResponse } from '../types/Logout.api.types';

export const logoutApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    logout: builder.mutation<LogoutResponse, LogoutRequest>({
      query: (credentials) => ({
        url: `auth/logout`,
        method: 'POST',
        body: credentials,
        credentials: 'include',
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLogoutMutation } = logoutApi;
