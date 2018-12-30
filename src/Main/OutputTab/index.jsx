import React from 'react';
import {connect} from 'react-redux';

import injectIframeCode from './injectIframeCode';

import './index.css';

/**@typedef {import('./../../utils/store').ReduxStore} ReduxStore*/
/**@typedef {import('./../../utils/store').Tabs} Tabs*/
/**@typedef {import('./../../utils/store').WebinSettings} WebinSettings*/

/**
 * @typedef {MapStateProps} OutputTabProps
 */

/**@type {NodeJS.Timeout} */
let updateTimer = null;
/**@type {HTMLIFrameElement} */
let iframeRef = null;

const getOutputMenuTab = ({webin_settings}) => {
    const { auto_run } = webin_settings;
    if(auto_run === 'true' || !auto_run){
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
 * @param {OutputTabProps} props 
 * @returns {import('react').ReactElement<OutputTabProps>}
 */
const OutputTab = (props) => {
    if (updateTimer) {
        clearTimeout(updateTimer);
    }
    updateTimer = setTimeout(() => {
        if(!iframeRef){
            return;
        }
        iframeRef.contentWindow.location.reload(true);
        iframeRef.onload = () => {
            injectIframeCode(props.tabs, iframeRef);
        }
    }, 2000);// TO_DO: Need to make this configurable
    return (
        <div className="tab output-tab">
            { getOutputMenuTab(props) }
            <hr/>
            <iframe
                title="webin ouput tab"
                frameBorder="0"
                src={`output.html`}
                ref={el => (iframeRef = el)}>
            </iframe>
        </div>
    );
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