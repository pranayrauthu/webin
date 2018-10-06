import { createContext } from 'react';


const getDefault = () => ({
    value: '',
    updateVaue: () => {}
});

const SandBoxContext = createContext({
    html: getDefault(),
    javascript: getDefault(),
    css: getDefault(),
    console: getDefault(),
    output: getDefault(),
});

export default SandBoxContext;