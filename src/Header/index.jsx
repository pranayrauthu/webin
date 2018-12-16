import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './index.css';

class Header extends Component {

    static propTypes = {
        tabs: PropTypes.object.isRequired
    }


    getBtns = () => {
        const { tabs } = this.props;
        return ['html', 'javascript', 'css', /*'console',*/'output'].map((value, index) => {
            const btnCssClass = (tabs[value].selected) ? "tab-btn selected" : "tab-btn";
            return (
                <button
                    key={value + index}
                    data-tab={value}
                    className={btnCssClass}>
                    {value}
                </button>
            );
        })
    }
    handleTabsClick = ({ target }) => {
        const { updateTabs } = this.props;
        if (!target || !target.dataset.tab) {
            return;
        }
        const clickedTab = target.dataset.tab;
        updateTabs(clickedTab);
    }
    render() {
        return (
            <header onClick={this.handleTabsClick}>
                <div>
                    <span className='app-name'>WEBIN</span>
                </div>
                {this.getBtns()}
                <div>{/*TODO: Need to remove this*/}</div>
                <div>
                    <span className="options-link" onClick={this.props.toggleOptionsTab}>Options</span>
                </div>
            </header>
        );
    }
}

const mapState = (state) => {
    console.log(state);
    return {
        tabs: state.sandBox.tabs
    };
};

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
