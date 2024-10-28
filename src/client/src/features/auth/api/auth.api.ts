import { emptySplitApi } from '@/shared/store/api/emptySplitApi';

export interface UserResponse {
  email: string;
  accessToken: string;
  sessionId: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export const authApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation } = authApi;
