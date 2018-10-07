import React, { Component } from "react";
import { Controlled as CodeMirror } from 'react-codemirror2';
import "codemirror/mode/xml/xml";

import SandBoxContext from "./../../Context/SandBoxContext";

class HtmlTabWithConsumer extends Component {
    state = {
        value: this.props.html.value
    }
    render() {
        return (
            <div className="tab html-tab">
                <CodeMirror
                    value={this.state.value}
                    options={{
                      mode: 'xml',
                      theme: '3024-day',
                      lineNumbers: true
                    }}
                    onBeforeChange={(editor, data, value) => {
                        this.setState({value});
                    }}
                    onChange={(editor, data, value) => {
                        this.props.html.updateValue(value);
                    }}
                />
            </div>
        );
    }
}

const HtmlTab = () => (
    <SandBoxContext.Consumer>
        {(props) => (<HtmlTabWithConsumer {...props} />)}
    </SandBoxContext.Consumer>
)

export default HtmlTab;