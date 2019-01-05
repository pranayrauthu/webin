import {
    combineReducers,
    createStore
} from "redux";

/**
 * @typedef {Object} WebinSettings
 * @property {string} font_family
 * @property {string} auto_run
 */

/**
 * @typedef {Object} App
 * @property {Object} optionsPopup
 * @property {WebinSettings} webin_settings
 */
const initialAppState = {
    optionsPopup: {
        state: 'closed'
    },
    webin_settings: {
        font_family: 'fira code light',
        auto_run: 'true'
    }
};

const appReducer = (state = initialAppState, action) => {
    const {
        type,
        data
    } = action;
    switch (type) {
        case 'TOGGLE_OPTIONS':
            return {
                ...state,
                optionsPopup: {
                    state: (state.optionsPopup.state === 'closed' ? 'open' : 'closed')
                }
            }
    }
    return state;
}

/**
 * @typedef {Object} Tab
 * @property {bool} selected
 * @property {string} value
 */

/**
 * @typedef {Object} Tabs
 * @property {Tab} html
 * @property {Tab} javascript
 * @property {Tab} css
 */

/**
 * @typedef {Object} SandBox
 * @property {Tabs} tabs
 */
const initialSanboxState = {
    tabs: {
        html: {
            selected: true,
            value: `<!-- import third party scripts with script tag -->\n` +
            `<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.min.js"></script> -->\n`+
            `<p>I am <strong>strong</strong>.</p>\n`
        },
        javascript: {
            selected: true,
            value: `console.log('hi...');`
        },
        css: {
            selected: false,
            value: `strong {\n\tcolor: red;\n}`
        },
        output: {
            selected: true
        },
        console: {
            selected: false
        }
    },

};

const sandBoxReducer = (state = initialSanboxState, action) => {

    const {
        type,
        data
    } = action;
    switch (type) {
        case 'UPDATE_TABS':
            return {
                ...state,
                tabs: {
                    ...state.tabs,
                    [data]: {
                        selected: !state.tabs[data].selected,
                        value: state.tabs[data].value
                    }
                }
            };
        case 'UPDATE_SANDBOX_VALUES':
            return {
                ...state,
                tabs: {
                    ...state.tabs,
                    [data.tab]: {
                        selected: state.tabs[data.tab].selected,
                        value: data.value
                    }
                }
            };
    }
    return state;
}


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