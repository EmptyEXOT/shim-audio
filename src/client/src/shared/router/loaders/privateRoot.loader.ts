import { authApi } from '@/features/auth/api/auth.api';
import { store } from '@/shared/store/store';

export const privateRouteLoader = async () => {
  const promise = store.dispatch(authApi.endpoints.validate.initiate({}));

  const { data, error } = await promise;

  console.log(data, error);

  return data?.isValid || false;
};
