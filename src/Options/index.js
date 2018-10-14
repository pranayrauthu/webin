import React, { Component } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/javascript/javascript';

import AppContext from './../Context/AppContext';

import "./index.css";

class OptionsWithConsumer extends Component {
    state = {
        webinOptions: this.props.webin_settings
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.webin_settings !== prevState.webin_settings) {
            return { webinOptions: nextProps.webin_settings };
        } else return null;
    }
    onOptionsChange = (editor, data, value) => {
        this.props.updateWebinSettings(value);
    }
    render() {
        return (
            <div className="options-form">
                <CodeMirror 
                    value={ this.state.webinOptions }
                    options={{
                        mode: 'application/json',
                        theme: 'mdn-like',
                        lineNumbers: true
                    }}
                    onBeforeChange={ this.onOptionsChange }
                />
                <hr/>
                <button 
                    onClick={ this.props.toggleOptionsTab }
                    className="option-form-btn"
                >
                    close
                </button>
            </div>
        );
    }
}

const Options = () => (
    <AppContext.Consumer>
        { (props) => <OptionsWithConsumer { ...props } /> }
    </AppContext.Consumer>
);


export default Options;