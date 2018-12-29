import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MonacoEditor from 'react-monaco-editor';

/**@typedef {import('./../../utils/store').ReduxStore} ReduxStore*/
/**@typedef {import('./../../utils/store').Tab} Tab*/


/**
 * @typedef {Object} HtmlTabProps
 * @mixes {MapStateProps}
 * @mixes {MapDispatchProps}
 */
const propTypes = {
    html: PropTypes.object.isRequired,
    updateValue: PropTypes.func.isRequired
}

/**
 * @class HtmlTab
 * @extends {PureComponent<HtmlTabProps>} 
 */
class HtmlTab extends PureComponent {
    static propTypes = propTypes
    /**
     * @typedef {Object} HtmlTabState
     * @property {string} value
     */
    state = {
        value: this.props.html.value
    }
    /**
     * 
     * @param {HtmlTabProps} nextProps 
     * @param {HtmlTabState} prevState
     * @returns {Object}
     */
    static getDerivedStateFromProps(nextProps, prevState) {
        if(prevState.value !== nextProps.html.value){
            return {
                value: nextProps.html.value
            }
        }
        return null;
      }
    onHtmlInputChange = (newValue, e) => {
        this.props.updateValue({
            tab: 'html',
            value: newValue
        });
    }
    render() {
        const options = {};
        return (
            <div className="tab html-tab">
                <div className="tab-name">HTML</div>
                <hr className="tab-title-line" />
                <MonacoEditor
                    width="400"
                    height="600"
                    language="html"
                    theme="vs-light"
                    value={this.state.value}
                    options={options}
                    onChange={this.onHtmlInputChange}
                />
            </div>
        );
    }
}

/**
 * @typedef {Object} MapStateProps
 * @property {Tab} html
 */

/**
 * 
 * @param {ReduxStore} state 
 * @returns {MapStateProps}
 */
const mapState = (state) => ({
    html: state.sandBox.tabs.html
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

export default connect(mapState, mapDispatch)(HtmlTab);