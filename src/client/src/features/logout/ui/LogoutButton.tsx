import { authActions } from '@/features/auth/model/auth.slice';
import { Button } from '@/shared/component/button/ui/Button';
import { COOKIE } from '@/shared/const/cookies.const';
import { useAppDispatch } from '@/shared/store/hooks/hooks';
import { FC } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../api/logout.api';

export interface LoginButtonProps {
  sessionId: number;
}

export const LogoutButton: FC<LoginButtonProps> = (props) => {
  const [logout, {}] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const redirect = useNavigate();
  // useCookies() возвращает массив: [get, set, remove, ...]
  const removeCookie = useCookies()[2];

  const onLogout = async () => {
    await logout({ sessionId: props.sessionId }).unwrap();
    removeCookie(COOKIE.ACCESS_TOKEN, { path: '/' });
    removeCookie(COOKIE.EMAIL, { path: '/' });
    removeCookie(COOKIE.SESSION_ID, { path: '/' });
    removeCookie(COOKIE.USER_ID, { path: '/' });
    dispatch(authActions.clearSession());
    redirect('login');
  };
  return <Button onClick={onLogout}>Logout</Button>;
};
