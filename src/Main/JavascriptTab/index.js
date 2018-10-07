import React, { Component } from "react";
import { Controlled as CodeMirror } from 'react-codemirror2';
import "codemirror/mode/javascript/javascript";

import SandBoxContext from "./../../Context/SandBoxContext";

class JavascriptTabWithConsumer extends Component {
    state = {
        value: this.props.javascript.value
    }
    render() {
        const { javascript } = this.props;
        return (
            <div className="tab javascript-tab">
                <CodeMirror
                    value={this.state.value}
                    options={{
                      mode: 'javascript',
                      theme: '3024-day',
                      lineNumbers: true
                    }}
                    onBeforeChange={(editor, data, value) => {
                        this.setState({value});
                    }}
                    onChange={(editor, data, value) => {
                        this.props.javascript.updateValue(value);
                    }}>
                </CodeMirror>
            </div>
        )
    }
}

const JavascriptTab = () => (
    <SandBoxContext.Consumer>
        {(props) => (<JavascriptTabWithConsumer {...props} />)}
    </SandBoxContext.Consumer>
);

export default JavascriptTab;