import { FC, useCallback } from 'react';
import { Session as SessionInfo } from '../types/Session.interface';
import { Button } from '@/shared/component/button/ui/Button';
import { useRemoveSessionMutation } from '@/features/remove_session/api/removeSession.api';

export interface SessionProps extends Omit<SessionInfo, 'id'> {
  sessionId: number;
  refetch: any;
}

export const Session: FC<SessionProps> = (props) => {
  const [removeSession] = useRemoveSessionMutation();
  const { refetch } = props;
  const onRemove = useCallback(async () => {
    try {
      await removeSession(props.sessionId).unwrap();
      refetch();
    } catch (e) {
      console.error('session removing error!');
    }
  }, [removeSession, props.sessionId, refetch]);
  return (
    <div className='outline p-2 flex justify-between'>
      <div>
        <h3>ID: {props.sessionId}</h3>
        <h3>Browser: {props.browser}</h3>
        <h3>Last Active: {String(props.lastActive)}</h3>
        <h3>OS: {props.os}</h3>
      </div>
      <Button onClick={onRemove}>Remove</Button>
    </div>
  );
};
