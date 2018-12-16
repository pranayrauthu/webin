import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/javascript/javascript';

import "./index.css";

class Options extends PureComponent {
    static propTypes = {
        webin_settings: PropTypes.object.isRequired,
        updateWebinSettings: PropTypes.func.isRequired
    }
    constructor(props){
        super(props);
        this.state = {
            webinOptions: JSON.stringify(props.webin_settings)
        }
    }
    onOptionsChange = (editor, data, value) => {
        this.props.updateWebinSettings(value);
    }
    render() {
        return (
            <div className="options-form">
                <CodeMirror
                    value={this.state.webinOptions}
                    options={{
                        mode: 'application/json',
                        theme: 'mdn-like',
                        lineNumbers: true
                    }}
                    onBeforeChange={(editor, data, value) => {
                        this.setState({ webinOptions: value });
                    }}
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

const mapState = (state) => ({
    webin_settings: state.app.webin_settings
});

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