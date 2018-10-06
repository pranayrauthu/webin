import React, { Component } from "react";

import SandBoxContext from "./../../Context/SandBoxContext";

class HtmlTabWithConsumer extends Component {
    onHtmlInputChange = ({target}) => {
        this.props.html.updateValue(target.value);
    }
    render() {
        const { html } = this.props;
        return (
            <div className="tab html-tab">
                <textarea
                    name="html-input"
                    value={html.value}
                    onChange={this.onHtmlInputChange}>
                </textarea>
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