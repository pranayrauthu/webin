import { js as js_beautify } from 'js-beautify';

/**
 * default options for webin. for new users these settings should be
 * pushed to their localStorage.
 * @type {Object}
 */
const defaultWebinSettings = {
    font_family: 'Courier New, monospace',
    /*['auto_run']: 'true'*/
}

/**
 * saves the webinOptions to localStorage.
 * TODO: Need to add localStorage availability check.
 * @param  {String} options - webin options in JSON format.
 * @return {Boolean} If saved successfully returns true.
 */
export function saveWebinOptions(options) {
    window.localStorage.setItem('webin_settings', options);
}

/**
 * loads webin options from localStorage & combines it with
 * default webin options.
 * @return {String}
 */
export function getWebinOptions() {
    let savedSettings = window.localStorage.getItem('webin_settings');
    if (!savedSettings) {
        const defaultOptionsString = JSON.stringify(defaultWebinSettings);
        saveWebinOptions(defaultOptionsString);
        return js_beautify(defaultOptionsString, { indent_size: 2 });
    }
    savedSettings = Object.assign({},
        defaultWebinSettings,
        JSON.parse(savedSettings)
    );
    return js_beautify(JSON.stringify(savedSettings), { indent_size: 2 });
}