import React, { Component } from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/theme/mdn-like.css';

import AppContext from './../Context/AppContext';
import SandBoxContext from './../Context/SandBoxContext';

import EditorTabFactory from './EditorTabFactory';

import './index.css';

class MainWithConsumer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            html: {
                value: '<p>I am <strong>strong</strong>.</p>'
            },
            javascript: {
                value: `/*add your javascript code here*/\nconsole.log('hi..');`
            },
            css: {
                value: `/*add your styles here*/`
            }
        }
    }
    updateHtmlValue = (htmlValue) => {
        this.setState({
            html: {
                value: htmlValue
            }
        });
    }
    updateJavascriptValue = (javascriptValue) => {
        this.setState({
            javascript: {
                value: javascriptValue
            }
        });
    }
    updateCssValue = (cssValue) => {
        this.setState({
            css: {
                value: cssValue
            }
        });
    }
    getContextValue() {
        const { html, javascript, css } = this.state;
        const { updateHtmlValue, updateJavascriptValue, updateCssValue } = this;
        return {
            html: {
                value: html.value,
                updateValue: updateHtmlValue
            },
            javascript: {
                value: javascript.value,
                updateValue: updateJavascriptValue
            },
            css: {
                value: css.value,
                updateValue: updateCssValue
            }
        }
    }
    getSelectedTabsCount() {
        const { tabs } = this.props;
        if (!tabs) {
            return 0;
        }
        return Object.keys(tabs).filter(t => tabs[t].selected).length;
    }
    getWebinFontFamily(){
        const webin_settings = JSON.parse(this.props.webin_settings);
        return webin_settings.font_family;
    }
    render() {
        const { tabs } = this.props;
        const selectedTabsCount = this.getSelectedTabsCount();
        return (
            <SandBoxContext.Provider value={this.getContextValue()}>
                <main className={`tab-count-${selectedTabsCount}`}>
                    <style>
                        {`:root{--webin-font-family:  ${ this.getWebinFontFamily() };}`}
                    </style>
                    {tabs && Object.keys(tabs)
                        .filter(t => tabs[t].selected)
                        .map((value, key) => {
                            return EditorTabFactory[value](value, key);
                        })}
                </main>
            </SandBoxContext.Provider>
        );
    }
};

const Main = () => {
    return (
        <AppContext.Consumer>
            {(props) => (<MainWithConsumer {...props} />)}
        </AppContext.Consumer>
    );
}

export default Main;