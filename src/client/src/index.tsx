import './app/index.css';
import { createRoot } from 'react-dom/client';
import { App } from './app/ui/App';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('element with id root doesnt exist');

const root = createRoot(rootElement);
root.render(<App />);
