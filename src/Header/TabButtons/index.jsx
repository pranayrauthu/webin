import React, { Fragment } from 'react';

import './index.css';

/**@typedef {import('./../../utils/store').Tabs} Tabs*/

/**
 * @typedef {Object} TabButtonsProps
 * @property {Tabs} tabs 
 */

/**
 * 
 * @param {TabButtonsProps} props 
 */
const TabButtons = ({ tabs }) => (
    <Fragment>
        {['html', 'javascript', 'css', /*'console',*/'output'].map((value, index) => {
            const btnCssClass = (tabs[value].selected) ? "tab-btn selected" : "tab-btn";
            return (
                <button
                    key={value + index}
                    data-tab={value}
                    className={btnCssClass}>
                    {value}
                </button>
            );
        })}
    </Fragment>
)

export default TabButtons;