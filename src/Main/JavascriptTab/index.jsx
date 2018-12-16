import React, { PureComponent } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Controlled as CodeMirror } from 'react-codemirror2';
import "codemirror/mode/javascript/javascript";

class JavascriptTab extends PureComponent {
    static propTypes = {
        javascript: PropTypes.object.isRequired
    }
    state = {
        value: this.props.javascript.value
    }
    render() {
        return (
            <div className="tab javascript-tab">
                <div className="tab-name">JavaScript</div>
                <hr className="tab-title-line"/>
                <CodeMirror
                    value={this.state.value}
                    options={{
                      mode: 'application/javascript',
                      theme: 'mdn-like',
                      lineNumbers: true
                    }}
                    onBeforeChange={(editor, data, value) => {
                        this.setState({value});
                    }}
                    onChange={(editor, data, value) => {
                        this.props.updateValue({
                            tab: 'javascript',
                            value
                        });
                    }}>
                </CodeMirror>
            </div>
        )
    }
}

const mapState = (state) => ({
    javascript: state.sandBox.tabs.javascript
});

const mapDispatch = (dispatch) => ({
    updateValue: (data) => {
        dispatch({
            type: 'UPDATE_SANDBOX_VALUES',
            data
        });
    }
});

export default connect(mapState, mapDispatch)(JavascriptTab);