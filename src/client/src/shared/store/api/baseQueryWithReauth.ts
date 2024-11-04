import { authActions } from '@/features/auth/model/auth.slice';
import { AuthModel } from '@/features/auth/types/AuthModel.interface';
import { COOKIE } from '@/shared/const/cookies.const';
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { baseQuery } from './baseQuery';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  const sessionId = cookies.get(COOKIE.SESSION_ID);

  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      {
        url: 'auth/refresh',
        method: 'POST',
        credentials: 'include',
        body: {
          sessionId,
        },
      },
      api,
      extraOptions
    );
    console.log(refreshResult.data);

    if (refreshResult.data) {
      const data = refreshResult.data as AuthModel;
      api.dispatch(authActions.setSession(data));

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(authActions.clearSession());
    }
  }
  //   console.log(result);
  return result;
};
