import React, { Component } from "react";

import SandBoxContext from "./../../Context/SandBoxContext";

class JavascriptTabWithConsumer extends Component {
    onJavascriptInputChange = ({target}) => {
        this.props.javascript.updateValue(target.value);
    }
    render() {
        const { javascript } = this.props;
        return (
            <div className="tab javascript-tab">
                <textarea
                    name="javascript-input"
                    id=""
                    cols="30"
                    rows="10"
                    value={javascript.value}
                    onChange={this.onJavascriptInputChange}>
                </textarea>
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