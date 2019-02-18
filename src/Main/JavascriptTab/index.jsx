import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import MonacoEditor from 'react-monaco-editor';

/**@typedef {import('../../redux/store').ReduxStore} ReduxStore*/
/**@typedef {import('../../redux/reducers/sandboxReducer').InputTab} InputTab*/

/**
 * @typedef {MapDispatchProps & MapStateProps} JavascriptTabProps
 */

/**
 * @class JavascriptTab
 * @extends {PureComponent<JavascriptTabProps>} props
 */
class JavascriptTab extends PureComponent {
    /**
     * @typedef {Object} JavascriptTabState
     * @property {string} value
     */
    state = {
        value: this.props.javascript.value
    }
    /**
     * 
     * @param {JavascriptTabProps} nextProps 
     * @param {JavascriptTabState} prevState 
     */
    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.value !== nextProps.javascript.value) {
            return {
                value: nextProps.javascript.value
            }
        }
        return null;
    }
    onJavascriptInputChange = (newValue, e) => {
        this.props.updateValue({
            tab: 'javascript',
            value: newValue
        });
    }
    render() {
        const options = {
            automaticLayout: true,
            minimap: {
                enabled: false
            }
        };
        return (
            <div className="tab javascript-tab">
                <div className="tab-name">JavaScript</div>
                <hr className="tab-title-line" />
                <MonacoEditor
                    height="500"
                    language="javascript"
                    theme="vs-light"
                    value={this.state.value}
                    options={options}
                    onChange={this.onJavascriptInputChange}
                />
            </div>
        )
    }

}

/**
 * @typedef {Object} MapStateProps
 * @property {InputTab} javascript
 */

/**
 * 
 * @param {ReduxStore} state 
 * @returns {MapStateProps}
 */
const mapState = (state) => ({
    javascript: state.sandBox.tabs.javascript
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

export default connect(mapState, mapDispatch)(JavascriptTab);