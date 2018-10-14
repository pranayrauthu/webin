import React from 'react';

import AppContext from './../../Context/AppContext';
import SandBoxContext from './../../Context/SandBoxContext';
import { getNestedProperty } from './../../utils';

import './index.css';

let updateTimer = null;
let iframeRef = null;
/**
 * 
 * @param  {Object} props - object with new html, javascript & css values.
 * @return {undefined} 
 */
const injectIframeCode = (props) => {
    const { javascript, css, html } = props;
    if (!getNestedProperty(iframeRef, 'contentWindow.document.body')) {
        return;
    }
    if (html) {
        iframeRef.contentWindow.document.body.innerHTML = html.value;
    }
    if (css) {
        const styleTag = iframeRef.contentWindow.document.createElement('style');
        styleTag.innerHTML = css.value;
        iframeRef.contentWindow.document.body.appendChild(styleTag);
    }
    if (javascript) {
        const scriptTag = iframeRef.contentWindow.document.createElement('script');
        scriptTag.innerHTML = javascript.value;
        iframeRef.contentWindow.document.body.appendChild(scriptTag);
    }
}

const getOutputMenuTab = ({webin_settings}) => {
    const { auto_run } = JSON.parse(webin_settings);
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

const OutputTabWithConsumer = (props) => {
    if (updateTimer) {
        clearTimeout(updateTimer);
    }
    updateTimer = setTimeout(() => {
        if(!iframeRef){
            return;
        }
        iframeRef.contentWindow.location.href = iframeRef.contentWindow.location.href;
        iframeRef.onload = () => {
            injectIframeCode(props);
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

const OutputTab = () => (
    <AppContext.Consumer>
        { (appProps) => (
            <SandBoxContext.Consumer>
                {(sandBoxProps) => (<OutputTabWithConsumer {...{...sandBoxProps, ...appProps}} />)}
            </SandBoxContext.Consumer>
        ) }
    </AppContext.Consumer>
);

export default OutputTab;