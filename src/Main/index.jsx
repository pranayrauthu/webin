import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/theme/mdn-like.css';

import EditorTabFactory from './EditorTabFactory';

import './index.css';

class Main extends PureComponent {
    static propTypes = {
        tabs: PropTypes.object.isRequired,
        webin_settings: PropTypes.object.isRequired
    }
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
    getWebinFontFamily() {
        return this.props.webin_settings.font_family;
    }
    render() {
        const { tabs } = this.props;
        const selectedTabsCount = this.getSelectedTabsCount();
        return (
            <main className={`tab-count-${selectedTabsCount}`}>
                <style>
                    {`:root{--webin-font-family:  ${this.getWebinFontFamily()};}`}
                </style>
                {tabs && Object.keys(tabs)
                    .filter(t => tabs[t].selected)
                    .map((value, key) => {
                        return EditorTabFactory[value](value, key);
                    })}
            </main>
        );
    }
};

const mapState = (state) => ({
    tabs: state.sandBox.tabs,
    webin_settings: state.app.webin_settings
});

export default connect(mapState)(Main);