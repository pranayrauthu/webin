import { createContext } from 'react';

const AppContext = createContext({
    tabs: {},
    updateTabs: () => {},
    optionsTab: null,
    toggleOptionsTab: () => {}
});

export default AppContext;