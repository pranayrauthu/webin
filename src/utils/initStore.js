import {
    combineReducers,
    createStore
} from "redux";

const initialAppState = {
    optionsPopup: {
        state: 'closed'
    },
    webin_settings: {
        font_family: 'fira code light'
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

const initialSanboxState = {
    tabs: {
        html: {
            selected: true,
            value: `<p>I am <strong>strong</strong>.</p>`
        },
        javascript: {
            selected: false,
            value: `console.log('hi...')`
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

const store = createStore(
    rootReducer
);

export default store;