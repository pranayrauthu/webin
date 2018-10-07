import React, { Component } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import "codemirror/mode/css/css";

import SandBoxContext from "./../../Context/SandBoxContext";

class CssTabWithConsumer extends Component {
    state = {
        value: this.props.css.value
    }
    render() {
        return (
            <div className="tab css-tab">
                <CodeMirror
                    value={this.state.value}
                    options={{
                      mode: 'css',
                      theme: '3024-day',
                      lineNumbers: true
                    }}
                    onBeforeChange={(editor, data, value) => {
                        this.setState({value});
                    }}
                    onChange={(editor, data, value) => {
                        this.props.css.updateValue(value);
                    }}
                />
            </div>
        );
    }
}

const CssTab = () => (
    <SandBoxContext.Consumer>
        {(props) => (<CssTabWithConsumer {...props} />)}
    </SandBoxContext.Consumer>
);
export default CssTab;