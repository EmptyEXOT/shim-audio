import { Button } from '@/shared/component/button/ui/Button';
import { FC } from 'react';
import { useRemoveSessionMutation } from '../api/removeSession.api';

export interface RemoveSessionButtonProps {
  sessionId: number;
}

export const RemoveSessionButton: FC<RemoveSessionButtonProps> = (props) => {
  const [removeSession, {}] = useRemoveSessionMutation();

  const onRemove = async () => {
    await removeSession(props.sessionId);
  };
  return <Button onClick={onRemove}>Remove</Button>;
};
