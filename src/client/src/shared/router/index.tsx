import { App } from '@/app';
import { HomePage } from '@/pages/home';
import { LoginPage } from '@/pages/login';
import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Skeleton } from '../component/skeleton';
import { ProfilePage } from '@/pages/profile';
import { privateRouteLoader } from './loaders/privateRoot.loader';
import { withPrivate } from './hocs/with_private/withPrivate';
import { withRedirectIfAuth } from './hocs/with_redirect_if_auth/withRedirectIfAuth';

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
        loader: privateRouteLoader,
        element: withRedirectIfAuth(
          <Suspense fallback={<Skeleton.Box height={'48px'} width={'100%'} />}>
            <LoginPage />
          </Suspense>,
          '/profile'
        ),
      },
      {
        path: '/profile',
        loader: privateRouteLoader,
        element: withPrivate(
          <Suspense fallback={<Skeleton.Box height={'48px'} width={'100%'} />}>
            <ProfilePage />
          </Suspense>,
          '/login'
        ),
      },
    ],
  },
]);
