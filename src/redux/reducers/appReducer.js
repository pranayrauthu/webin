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

export const appReducer = (state = initialAppState, action) => {
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