import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import injectIframeCode from './injectIframeCode';

import './index.css';

/**@typedef {import('./../../utils/store').ReduxStore} ReduxStore*/
/**@typedef {import('./../../utils/store').Tabs} Tabs*/
/**@typedef {import('./../../utils/store').WebinSettings} WebinSettings*/

/**
 * @typedef {MapStateProps} OutputTabProps
 */

const getOutputMenuTab = ({ webin_settings }) => {
    const { auto_run } = webin_settings;
    if (auto_run === 'true' || !auto_run) {
        return null;
    }
    return (
        <div className="output-menu">
            {/*TODO: Need to add an event handler for refreshing the output.*/}
            <span className="output-menu-item">run</span>
        </div>
    );
}

/**
 * 
 * @class OutputTab
 * @extends {PureComponent<OutputTabProps>}
 */
class OutputTab extends PureComponent {
    constructor(props) {
        super(props);
        /**@type {HTMLIFrameElement} */
        this.iframeRef = null;
        /**@type {NodeJS.Timeout} */
        this.updateTimer = null;
    }
    onIframeLoad = () => {
        injectIframeCode(this.props.tabs, this.iframeRef);
    }
    componentDidMount() {
        this.iframeRef.addEventListener('load', this.onIframeLoad);
    }
    componentWillUnmount() {
        this.iframeRef.removeEventListener('load', this.onIframeLoad);
    }
    componentWillReceiveProps() {
        if (this.updateTimer) {
            clearTimeout(this.updateTimer);
        }
        this.updateTimer = setTimeout(() => {
            if (!this.iframeRef) {
                return;
            }
            this.iframeRef.contentWindow.location.reload(true);
        }, 2000);// TO_DO: Need to make this configurable
    }
    getOutputMenuTab() {
        const { auto_run } = this.props.webin_settings;
        if (auto_run === 'true' || !auto_run) {
            return null;
        }
        return (
            <div className="output-menu">
                {/*TODO: Need to add an event handler for refreshing the output.*/}
                <span className="output-menu-item">run</span>
            </div>
        );
    }
    render() {
        return (
            <div className="tab output-tab">
                {this.getOutputMenuTab()}
                <hr />
                <iframe
                    title="webin ouput tab"
                    frameBorder="0"
                    src={`output.html`}
                    ref={el => (this.iframeRef = el)}>
                </iframe>
            </div>
        );
    }
}

/**
 * @typedef {Object} MapStateProps
 * @property {Tabs} tabs
 * @property {WebinSettings} webin_settings
 */

/**
 * 
 * @param {ReduxStore} state 
 * @returns {MapStateProps}
 */
const mapState = (state) => ({
    tabs: state.sandBox.tabs,
    webin_settings: state.app.webin_settings
});

export default connect(mapState)(OutputTab);