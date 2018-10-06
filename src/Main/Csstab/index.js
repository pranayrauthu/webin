import React, { Component } from 'react';

import SandBoxContext from "./../../Context/SandBoxContext";

class CssTabWithConsumer extends Component {
    onCssInputChange = ({ target }) => {
        this.props.css.updateValue(target.value);
    }
    render() {

        return (
            <div className="tab css-tab">
                <textarea
                    name="css-input"
                    id=""
                    cols="30"
                    rows="10"
                    value={this.props.css.value}
                    onChange={this.onCssInputChange}>
                </textarea>
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