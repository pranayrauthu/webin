import React from 'react';

import HtmlTab from './../HtmlTab';
import JavascriptTab from './../JavascriptTab';
import CssTab from './../CssTab';
import OutputTab from './../OutputTab';


const EditorTabFactory = {
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