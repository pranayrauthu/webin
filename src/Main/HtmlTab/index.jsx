import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import MonacoEditor from 'react-monaco-editor';

/**@typedef {import('react-monaco-editor').ChangeHandler} ChangeHandler*/
/**@typedef {import('monaco-editor').editor.IEditorConstructionOptions} IEditorConstructionOptions*/
/**@typedef {import('./../../utils/store').ReduxStore} ReduxStore*/
/**@typedef {import('./../../utils/store').Tab} Tab*/


/**
 * @typedef {MapStateProps & MapDispatchProps} HtmlTabProps
 */

/**
 * @class HtmlTab
 * @extends {PureComponent<HtmlTabProps & MapStateProps & MapDispatchProps>} 
 */
class HtmlTab extends PureComponent {
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
        if (prevState.value !== nextProps.html.value) {
            return {
                value: nextProps.html.value
            }
        }
        return null;
    }
    /**@type {ChangeHandler} */
    onHtmlInputChange = (newValue, e) => {
        this.props.updateValue({
            tab: 'html',
            value: newValue
        });
    }
    render() {
        /**@type {IEditorConstructionOptions} */
        const options = {
            automaticLayout:true,
            minimap: {
                enabled: false
            }
        };
        return (
            <div className="tab html-tab">
                <div className="tab-name">HTML</div>
                <hr className="tab-title-line" />
                <MonacoEditor
                    height="500"
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