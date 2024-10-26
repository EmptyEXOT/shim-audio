import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './app/index.css';
import { router } from '@/shared/router';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('element with id root doesnt exist');

const root = createRoot(rootElement);
root.render(<RouterProvider router={router} />);
