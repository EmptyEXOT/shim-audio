import { App } from '@/app';
import { HomePage } from '@/pages/home';
import { LoginPage } from '@/pages/login';
import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback='loading'>
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
