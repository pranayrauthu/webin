import React, { Component } from 'react';
import { connect } from 'react-redux';

import TabButtons from './TabButtons';

import './index.css';

/**@typedef {import('./../utils/store').ReduxStore} ReduxStore*/
/**@typedef {import('./../utils/store').Tabs} Tabs*/

/**
 * @typedef {MapStateProps & MapDispatchProps} HeaderProps
 */

 /**
  * @class Header
  * @extends {Component<HeaderProps>}
  */
class Header extends Component {
    handleTabsClick = ({ target }) => {
        const { updateTabs } = this.props;
        if (!target || !target.dataset.tab) {
            return;
        }
        const clickedTab = target.dataset.tab;
        updateTabs(clickedTab);
    }
    render() {
        const {tabs} = this.props;
        return (
            <header onClick={this.handleTabsClick}>
                <div>
                    <span className='app-name'>WEBIN</span>
                </div>
                <TabButtons tabs={tabs}/>
                <div>{/*TODO: Need to remove this*/}</div>
                <div>
                    <span className="options-link" onClick={this.props.toggleOptionsTab}>Options</span>
                </div>
            </header>
        );
    }
}
/**
 * @typedef {Object} MapStateProps
 * @property {Tabs} tabs
 */

/**
 * 
 * @param {ReduxStore} state
 * @returns {MapStateProps}
 */
const mapState = (state) => ({
    tabs: state.sandBox.tabs
});

/**
 * @typedef {Object} MapDispatchProps
 * @property {function} updateTabs
 * @property {React.MouseEventHandler} toggleOptionsTab
 */


/**
 * 
 * @param {function} dispatch 
 * @returns {MapDispatchProps}
 */
const mapDispatch = (dispatch) => ({
    updateTabs: (data) => {
        dispatch({
            type: 'UPDATE_TABS',
            data
        });
    },
    toggleOptionsTab: () => {
        dispatch({
            type: 'TOGGLE_OPTIONS'
        });
    }
});

export default connect(mapState, mapDispatch)(Header);
