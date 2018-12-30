import React from 'react';

import HtmlTab from '../HtmlTab';
import JavascriptTab from '../JavascriptTab';
import CssTab from '../CssTab';
import OutputTab from '../OutputTab';

/**@typedef {import('./../HtmlTab')} HtmlTab*/
/**@typedef {import('./../JavascriptTab')} JavascriptTab*/
/**@typedef {import('./../CssTab')} CssTab*/
/**@typedef {import('./../OutputTab')} OutputTab*/

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
    /**
     * 
     * @param {string} value 
     * @param {number} key 
     * @returns {React.ReactElement<JavascriptTab>}
     */
    javascript(value, key) {
        return (<JavascriptTab key={value + key} />);
    },
    /**
     * 
     * @param {string} value 
     * @param {number} key 
     * @returns {React.ReactElement<CssTab>}
     */
    css(value, key) {
        return (<CssTab key={value + key} />);
    },
    /**
     * 
     * @param {string} value 
     * @param {number} key 
     * @returns {React.ReactElement<OutputTab>}
     */
    output(value, key) {
        return (<OutputTab key={value + key} />);
    }
}

export default EditorTabFactory;