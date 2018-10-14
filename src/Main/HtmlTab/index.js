import React, { Component } from "react";
import { Controlled as CodeMirror } from 'react-codemirror2';
import "codemirror/mode/xml/xml";
import "codemirror/addon/hint/xml-hint.js";
import "codemirror/addon/hint/show-hint.js";
import "codemirror/addon/hint/html-hint.js";

import SandBoxContext from "./../../Context/SandBoxContext";

class HtmlTabWithConsumer extends Component {
    state = {
        value: this.props.html.value
    }
    render() {
        return (
            <div className="tab html-tab">
                <div className="tab-name">HTML</div>
                <hr className="tab-title-line"/>
                <CodeMirror
                    value={this.state.value}
                    options={{
                      mode: 'text/html',
                      theme: 'mdn-like',
                      extraKeys: {"Ctrl-Space": "autocomplete"},
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