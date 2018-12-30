import React, { PureComponent } from 'react';
import {connect} from 'react-redux';

import EditorTabFactory from './EditorTabFactory';

import './index.css';

/**@typedef {import('./../utils/store').ReduxStore} ReduxStore*/
/**@typedef {import('./../utils/store').Tabs} Tabs*/
/**@typedef {import('./../utils/store').WebinSettings} WebinSettings*/

/**
 * @typedef {MapStateProps} MainProps
 */

/**
 * @extends {PureComponent<MainProps>}
 */
class Main extends PureComponent {
    /**
     * @type {Object}
     */
    state = {
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
    /**
     * @returns {number}
     */
    getSelectedTabsCount() {
        const tabs = this.getSelectedTabs();
        return tabs.length;
    }
    getWebinFontFamily() {
        return this.props.webin_settings.font_family;
    }
    /**
     * @returns {string[]}
     */
    getSelectedTabs() {
        const { tabs = {} } = this.props;
        return Object.keys(tabs)
        .filter(tab => tabs[tab].selected);
    }
    /**
     * @returns {React.ReactElement[]}
     */
    getSelectedTabComponents() {
        return this.getSelectedTabs()
        .map( (value, key) => (
            EditorTabFactory[value](value, key)
        ));
    }
    render() {
        const { tabs } = this.props;
        const selectedTabsCount = this.getSelectedTabsCount();
        return (
            <main className={`tab-count-${selectedTabsCount}`}>
                <style>
                    {`:root{--webin-font-family:  ${this.getWebinFontFamily()};}`}
                </style>
                { this.getSelectedTabComponents() }
            </main>
        );
    }
};

/**
 * 
 * @typedef {Object} MapStateProps
 * @property {Tabs} tabs
 * @property {WebinSettings} webin_settings
 */

 /**
  * 
  * @param {ReduxStore} state 
  * @returns {MapStateProps}
  */
const mapState = (state) => ({
    tabs: state.sandBox.tabs,
    webin_settings: state.app.webin_settings
});

export default connect(mapState)(Main);