/**
 * @typedef {Object} Tab
 * @property {bool} selected
 */

/**
 * @typedef {Object} InputTabType
 * @property {string} value
 * @typedef {Tab & InputTabType} InputTab
 */

/**
 * @typedef {Object} OutputTabType
 * @property {bool} disablePointerEvents
 * @typedef {Tab & OutputTabType} OutputTab
 */

/**
 * @typedef {Object} Tabs
 * @property {InputTab} html
 * @property {InputTab} javascript
 * @property {InputTab} css
 * @property {OutputTab} output
 * @property {Tab} console
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
            selected: true,
            disablePointerEvents: false
        },
        console: {
            selected: false
        }
    },

};

export const sandBoxReducer = (state = initialSanboxState, action) => {
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
        case 'SWITCH_IFRAME_POINTER_EVENTS':
            return {
                ...state,
                tabs: {
                    ...state.tabs,
                    output: {
                        ...state.tabs.output,
                        disablePointerEvents: data
                    }
                }
            };
    }
    return state;
}