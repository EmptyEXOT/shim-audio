import { App } from '@/app';
import { HomePage } from '@/pages/home';
import { LoginPage } from '@/pages/login';
import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Skeleton } from '../component/skeleton';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Skeleton.Box height={'48px'} width={'100%'} />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: '/login',
        element: (
          <Suspense fallback='loading'>
            <LoginPage />
          </Suspense>
        ),
      },
    ],
  },
]);
