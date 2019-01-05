import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import SplitterLayout from 'react-splitter-layout';
import range from 'lodash/range';

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
    getSizes(){
        const tabCount = this.getSelectedTabsCount();
        return range(tabCount).map(x => parseInt((100/tabCount).toFixed()) );
    }
    getSplittedComponents( panes, secondaryInitialSize ){
        const [ firstPane, ...restPanes ] = panes;
        if(restPanes.length === 0){
            return firstPane;
        }
        return (
            <SplitterLayout 
                percentage={true}
                secondaryInitialSize={ 100 - (100/panes.length) }
                primaryMinSize={20}
            >
                { firstPane }
                { this.getSplittedComponents( restPanes ) }
            </SplitterLayout>
        );
    }
    render() {
        const tabComponents = this.getSelectedTabComponents();
        const selectedTabsCount = this.getSelectedTabsCount();
        const splittedTabComponents = this.getSplittedComponents(
            tabComponents
        );
        return (
            <main className={`tab-count-${selectedTabsCount} clearfix`}>
                <style>
                    {`:root{--webin-font-family:  ${this.getWebinFontFamily()};}`}
                </style>
                { splittedTabComponents }      
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