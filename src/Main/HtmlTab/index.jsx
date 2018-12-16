import React, { PureComponent } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Controlled as CodeMirror } from 'react-codemirror2';
import "codemirror/mode/xml/xml";
import "codemirror/addon/hint/xml-hint.js";
import "codemirror/addon/hint/show-hint.js";
import "codemirror/addon/hint/html-hint.js";

class HtmlTab extends PureComponent {
    static propTypes = {
        html: PropTypes.object.isRequired,
        updateValue: PropTypes.func.isRequired
    }
    state = {
        value: this.props.html.value
    }
    render() {
        return (
            <div className="tab html-tab">
                <div className="tab-name">HTML</div>
                <hr className="tab-title-line" />
                <CodeMirror
                    value={this.state.value}
                    options={{
                        mode: 'text/html',
                        theme: 'mdn-like',
                        extraKeys: { "Ctrl-Space": "autocomplete" },
                        lineNumbers: true
                    }}
                    onBeforeChange={(editor, data, value) => {
                        this.setState({ value });
                    }}
                    onChange={(editor, data, value) => {
                        this.props.updateValue({
                            tab: 'html',
                            value
                        });
                    }}
                />
            </div>
        );
    }
}

const mapState = (state) => ({
    html: state.sandBox.tabs.html
});

const mapDispatch = (dispatch) => ({
    updateValue: (data) => {
        dispatch({
            type: 'UPDATE_SANDBOX_VALUES',
            data
        });
    }
});

export default connect(mapState, mapDispatch)(HtmlTab);