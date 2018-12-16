import React from 'react';

import './index.css';

TabButtons = ({ tabs }) => {
    return ['html', 'javascript', 'css', /*'console',*/'output'].map((value, index) => {
        const btnCssClass = (tabs[value].selected) ? "tab-btn selected" : "tab-btn";
        return (
            <button
                key={value + index}
                data-tab={value}
                className={btnCssClass}>
                {value}
            </button>
        );
    })
}

export default TabButtons;