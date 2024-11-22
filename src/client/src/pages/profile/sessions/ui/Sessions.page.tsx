import { Session } from '@/entities/sessions';
import { useGetSessionsQuery } from '@/entities/sessions/api/sessions.api';
import { authSelector } from '@/features/auth/selectors/auth.selector';
import { TerminateOtherSessionsButton } from '@/features/terminate_other_sessions/ui/TerminateOtherSessionsButton';
import { useAppSelector } from '@/shared/store/hooks/hooks';
import { FC } from 'react';

export interface SessionsPageProps {}

const SessionsPage: FC<SessionsPageProps> = () => {
  const { userId, sessionId } = useAppSelector(authSelector);
  const { data, refetch } = useGetSessionsQuery(userId as number);

  return (
    <div className='container mx-auto'>
      <TerminateOtherSessionsButton sessionId={sessionId || 0} />
      <div className='flex gap-2 flex-col justify-center'>
        {data
          ? data.map((session, index) => (
              <Session
                browser={session.browser}
                sessionId={session.id}
                key={index}
                lastActive={session.lastActive}
                os={session.os}
                refetch={refetch}
              />
            ))
          : 'sessions not found!'}
      </div>
    </div>
  );
};

export default SessionsPage;
