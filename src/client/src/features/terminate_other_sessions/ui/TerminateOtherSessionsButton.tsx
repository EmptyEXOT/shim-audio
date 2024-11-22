import { Button } from '@/shared/component/button/ui/Button';
import { FC } from 'react';
import { useTerminateOtherSessionsMutation } from '../api/terminateOtherSessions.api';

export interface TerminateOtherSessionsButtonProps {
  sessionId: number;
}

export const TerminateOtherSessionsButton: FC<
  TerminateOtherSessionsButtonProps
> = (props) => {
  const [terminate, {}] = useTerminateOtherSessionsMutation();

  const onTerminate = async () => {
    await terminate(props.sessionId);
  };
  return <Button onClick={onTerminate}>Terminate</Button>;
};
