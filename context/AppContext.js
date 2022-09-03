import { createContext } from 'react';
import { init } from '../state/appState';

const AppContext = createContext(init);

export default AppContext;
