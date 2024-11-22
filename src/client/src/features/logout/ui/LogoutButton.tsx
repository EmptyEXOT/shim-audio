import { Button } from '@/shared/component/button/ui/Button';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../api/logout.api';
import { useAppDispatch } from '@/shared/store/hooks/hooks';
import { authActions } from '@/features/auth/model/auth.slice';

export interface LoginButtonProps {
  sessionId: number;
}

export const LogoutButton: FC<LoginButtonProps> = (props) => {
  const [logout, {}] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const redirect = useNavigate();

  const onLogout = async () => {
    await logout({ sessionId: props.sessionId });
    dispatch(authActions.clearSession());
    redirect('login');
  };
  return <Button onClick={onLogout}>Logout</Button>;
};
