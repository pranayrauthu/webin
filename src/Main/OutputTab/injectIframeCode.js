// import getNestedProperty from '../../utils/getNestedProperty';
// import get from 'lodash/get';

/**@typedef {import('../../redux/store').Tabs} Tabs*/

/**
 * 
 * @param {Tabs} tabs 
 * @param {HTMLIFrameElement} iframeRef
 */
function injectIframeCode(tabs, iframeRef) {
    const {
        javascript,
        html,
        css
    } = tabs;
    const outputDiv = document.createElement('div');
    if (html) {
        outputDiv.innerHTML = html.value;
    }
    if (css) {
        const styleTag = iframeRef.contentWindow.document.createElement('style');
        styleTag.innerHTML = css.value;
        outputDiv.appendChild(styleTag);
    }
    if (javascript) {
        const scriptTag = iframeRef.contentWindow.document.createElement('script');
        scriptTag.innerHTML = javascript.value;
        outputDiv.appendChild(scriptTag);
    }
    if(outputDiv.innerHTML){
        iframeRef.contentWindow.document.write( outputDiv.innerHTML );
    }
}

export default injectIframeCode;