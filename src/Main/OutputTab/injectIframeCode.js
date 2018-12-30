import getNestedProperty from '../../utils/getNestedProperty';

/**@typedef {import('./../../utils/store').Tabs} Tabs*/

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
    if (!getNestedProperty(iframeRef, 'contentWindow.document.body')) {
        return;
    }
    if (html) {
        iframeRef.contentWindow.document.write( html.value );

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

export default injectIframeCode;