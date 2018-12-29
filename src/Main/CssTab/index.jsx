import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MonacoEditor from 'react-monaco-editor';

/**@typedef {import('./../../utils/store').ReduxStore} ReduxStore*/
/**@typedef {import('./../../utils/store').Tab} Tab*/


/**
 * @typedef {Object} CssTabProps
 * @mixes {MapStateProps}
 * @mixes {MapDispatchProps}
 */
const propTypes = {
    css: PropTypes.object.isRequired,
    updateValue: PropTypes.func.isRequired
}

/**
 * @typedef {Object} JavascriptTab
 * @extends {PureComponent<CssTabProps>} 
 */
class CssTab extends PureComponent {
    static propTypes = {
        css: PropTypes.object.isRequired
    }
    /**
     * @typedef {Object} CssTabState
     * @property {string} value
     */
    state = {
        value: this.props.css.value
    }
    /**
     * 
     * @param {CssTabProps} nextProps 
     * @param {CssTabState} prevState 
     */
    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.value !== nextProps.css.value) {
            return {
                value: nextProps.css.value
            }
        }
        return null;
    }
    onCssInputChange = (newValue, e) => {
        this.props.updateValue({
            tab: 'css',
            value: newValue
        });
    }
    render() {
        const options = {};
        return (
            <div className="tab css-tab">
                <div className="tab-name">CSS</div>
                <hr className="tab-title-line"/>
                <MonacoEditor
                    width="400"
                    height="600"
                    language="css"
                    theme="vs-light"
                    value={this.state.value}
                    options={options}
                    onChange={this.onCssInputChange}
                />
            </div>
        );
    }
}

/**
 * @typedef {Object} MapStateProps
 * @property {Tab} css
 */

/**
 * 
 * @param {ReduxStore} state 
 * @returns {MapStateProps}
 */
const mapState = (state) => ({
    css: state.sandBox.tabs.css
});

/**
 * @typedef {Object} MapDispatchProps
 * @property {function} updateValue
 */

/**
 * 
 * @param {function} dispatch 
 * @returns {MapDispatchProps}
 */
const mapDispatch = (dispatch) => ({
    updateValue: (data) => {
        dispatch({
            type: 'UPDATE_SANDBOX_VALUES',
            data
        });
    }
});

export default connect(mapState, mapDispatch)(CssTab);