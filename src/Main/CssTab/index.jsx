import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Controlled as CodeMirror } from 'react-codemirror2';
import "codemirror/mode/css/css";

class CssTab extends PureComponent {
    static propTypes = {
        css: PropTypes.object.isRequired
    }
    state = {
        value: this.props.css.value
    }
    render() {
        return (
            <div className="tab css-tab">
                <div className="tab-name">CSS</div>
                <hr class="tab-title-line"/>
                <CodeMirror
                    value={this.state.value}
                    options={{
                      mode: 'css',
                      theme: 'mdn-like',
                      lineNumbers: true
                    }}
                    onBeforeChange={(editor, data, value) => {
                        this.setState({value});
                    }}
                    onChange={(editor, data, value) => {
                        this.props.updateValue({
                            tab: 'css',
                            value
                        });
                    }}
                />
            </div>
        );
    }
}

const mapState = (state) => ({
    css: state.sandBox.tabs.css
});

const mapDispatch = (dispatch) => ({
    updateValue: (data) => {
        dispatch({
            type: 'UPDATE_SANDBOX_VALUES',
            data
        });
    }
});

export default connect(mapState, mapDispatch)(CssTab);