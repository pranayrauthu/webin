import { createContext } from 'react';

const AppContext = createContext({
    tabs: {},
    updateTabs: () => {}
});

export default AppContext;