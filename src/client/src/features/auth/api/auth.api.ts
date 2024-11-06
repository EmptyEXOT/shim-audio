import { emptySplitApi } from '@/shared/store/api/emptySplitApi';
import { LoginRequest, LoginResponse } from '../types/Login.api.types';
import { ValidateResponse } from '../types/Validate.api.types';

export const authApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
        credentials: 'include',
      }),
    }),
    validate: builder.query<ValidateResponse, {}>({
      query: () => ({
        url: 'auth/validate',
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useValidateQuery } = authApi;
