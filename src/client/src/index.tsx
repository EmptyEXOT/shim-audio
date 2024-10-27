import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './app/index.css';
import { router } from '@/shared/router';
import { StoreProvider } from './shared/store/ui/Store.provider';
import { ThemeProvider } from './shared/providers/theme';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('element with id root doesnt exist');

const root = createRoot(rootElement);
root.render(
  <StoreProvider>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StoreProvider>
);
