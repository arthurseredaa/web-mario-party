import { createRoot } from 'react-dom/client';
import { helloWorld } from '@wmp/shared';

helloWorld();

createRoot(document.getElementById('root')!).render(<h1>gamepad</h1>);
