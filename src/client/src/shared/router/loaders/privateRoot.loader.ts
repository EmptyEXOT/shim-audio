import { authApi } from '@/features/auth/api/auth.api';
import { store } from '@/shared/store/store';
import { Cookies } from 'react-cookie';

export const privateRouteLoader = async () => {
  const promise = store.dispatch(authApi.endpoints.validate.initiate({}));
  const accessToken = store.getState().auth.accessToken;

  const { data, error } = await promise;

  const canActivate = data?.isValid && accessToken;
  // if (canActivate) store.dispatch(authActions.clearSession());
  return canActivate || false;
};
