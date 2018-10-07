import React, { Component } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/3024-day.css";

import AppContext from "./../Context/AppContext";
import SandBoxContext from "./../Context/SandBoxContext";

import HtmlTab from "./HtmlTab";
import OutputTab from "./OutputTab";
import JavascriptTab from "./JavascriptTab";
import CssTab from "./Csstab";

import "./index.css";

const tabsFactory = {
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
    },
    console(value, key) {
        return (
            <div id="console-tab" key={value + key}>
                Console not yet ready. Please use browser console.
            </div>
        );
    }
}

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
    getSelectedTabsCount(){
        const {tabs} = this.props;
        if(!tabs){
            return 0;
        }
        return Object.keys(tabs).filter(t => tabs[t].selected).length;
    }
    render() {
        const { tabs } = this.props;
        const selectedTabsCount = this.getSelectedTabsCount();
        return (
            <SandBoxContext.Provider value={this.getContextValue()}>
                <main className={`tab-count-${selectedTabsCount}`}>
                    {tabs && Object.keys(tabs)
                        .filter(t => tabs[t].selected)
                        .map((value, key) => {
                            return tabsFactory[value](value, key);
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