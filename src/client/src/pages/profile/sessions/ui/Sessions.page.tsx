import { Session } from '@/entities/sessions';
import { useGetSessionsQuery } from '@/entities/sessions/api/sessions.api';
import { FC } from 'react';

export interface SessionsPageProps {}

const SessionsPage: FC<SessionsPageProps> = () => {
  const { data, refetch } = useGetSessionsQuery(1);

  return (
    <div className='container mx-auto'>
      <h1>Sessions Page</h1>
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
