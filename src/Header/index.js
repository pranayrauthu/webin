import React from 'react';

import AppContext from "./../Context/AppContext";

import "./index.css";

const HeaderWithConsumer = ({ updateTabs, tabs }) => {


    const getBtns = () => {
        return ['html', 'javascript', 'css', /*'console',*/'output'].map((value, index) => {
            const btnCssClass = tabs[value].selected ? "tab-btn selected" : "tab-btn";
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
    const handleTabsClick = ({ target }) => {
        if (!target || !target.dataset.tab) {
            return;
        }
        const clickedTab = target.dataset.tab;
        updateTabs(clickedTab);
    }
    return (
        <header onClick={ handleTabsClick }>
            <div>
                <span className='app-name'>WEBIN</span>
            </div>
            { getBtns() }
        </header>
    );
}

const Header = () => (
    <AppContext.Consumer>
        { HeaderWithConsumer }
    </AppContext.Consumer>
);

export default Header;
