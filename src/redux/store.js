import {
    combineReducers,
    createStore
} from "redux";
import { appReducer } from './reducers/appReducer';
import { sandBoxReducer } from './reducers/sandboxReducer';

/**@typedef {import('./reducers/appReducer').App} App*/
/**@typedef {import('./reducers/sandboxReducer').SandBox} SandBox3*/

const rootReducer = combineReducers({
    app: appReducer,
    sandBox: sandBoxReducer
});

/**
 * @typedef {Object} ReduxStore
 * @property {App} app
 * @property {SandBox} sandBox
 */
const store = createStore(
    rootReducer
);

export default store;