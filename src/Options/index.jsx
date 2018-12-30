import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import MonacoEditor from 'react-monaco-editor';

import "./index.css";

/**@typedef {import('react-monaco-editor').ChangeHandler} ChangeHandler*/
/**@typedef {import('./../utils/store').ReduxStore} ReduxStore*/
/**@typedef {import('./../utils/store').WebinSettings} WebinSettings*/

/**
 * @typedef {MapDispatchProps & MapStateProps} OptionsProps
 */

/**
 * @class Options
 * @extends {PureComponent<OptionsProps>}
 */
class Options extends PureComponent {
    /**@constructor */
    constructor(props){
        super(props);
        /**
         * @type {Object}
         * @property {string} webinOptions
         */
        this.state = {
            webinOptions: JSON.stringify(props.webin_settings)
        }
    }
    /**@type {ChangeHandler} */
    onOptionsChange = (newValue, e) => {
        this.props.updateWebinSettings(newValue);
    }
    render() {
        const options = {};
        return (
            <div className="options-form">
                <MonacoEditor
                    height="600"
                    language="json"
                    theme="vs-light"
                    value={this.state.webinOptions}
                    options={options}
                    onChange={this.onOptionsChange}
                />
                <hr />
                <button
                    onClick={this.props.toggleOptionsTab}
                    className="option-form-btn"
                >
                    close
                </button>
            </div>
        );
    }
}

/**
 * @typedef {Object} MapStateProps
 * @property {WebinSettings} webin_settings
 */

 /**
  * 
  * @param {ReduxStore} state 
  * @returns {MapStateProps}
  */
const mapState = (state) => ({
    webin_settings: state.app.webin_settings
});

/**
 * @typedef {Object} MapDispatchProps
 * @property {function} updateWebinSettings
 * @property {React.MouseEventHandler} toggleOptionsTab
 */

/**
 * 
 * @param {function} dispatch 
 * @returns {MapDispatchProps}
 */
const mapDispatch = (dispatch) => ({
    updateWebinSettings: (data) => {
        dispatch({
            type: 'UPDATE_WEBIN_SETTINGS',
            data
        })
    },
    toggleOptionsTab: () => {
        dispatch({
            type: 'TOGGLE_OPTIONS'
        });
    }
});


export default connect(mapState, mapDispatch)(Options);