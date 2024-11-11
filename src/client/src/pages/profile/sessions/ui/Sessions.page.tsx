import { Session } from '@/entities/sessions';
import { useGetSessionsQuery } from '@/entities/sessions/api/sessions.api';
import { authSelector } from '@/features/auth/selectors/auth.selector';
import { useAppSelector } from '@/shared/store/hooks/hooks';
import { FC } from 'react';

export interface SessionsPageProps {}

const SessionsPage: FC<SessionsPageProps> = () => {
  const { userId } = useAppSelector(authSelector);
  const { data, refetch } = useGetSessionsQuery(userId || 0);

  return (
    <div className='container mx-auto'>
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
