import React from 'react';

import HtmlTab from '../HtmlTab';
import JavascriptTab from '../JavascriptTab';
import CssTab from '../CssTab';
import OutputTab from '../OutputTab';

/**@typedef {import('./../HtmlTab')} HtmlTab*/

const EditorTabFactory = {
    /**
     * 
     * @param {string} value 
     * @param {number} key 
     * @returns {React.ReactElement<HtmlTab>}
     */
    html(value, key) {
        return (<HtmlTab key={value + key} />);
    },
    javascript(value, key) {
        return (<JavascriptTab key={value + key} />);
    },
    css(value, key) {
        return (<CssTab key={value + key} />);
    },
    output(value, key) {
        return (<OutputTab key={value + key} />);
    }
}

export default EditorTabFactory;