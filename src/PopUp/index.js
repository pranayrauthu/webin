import React from 'react';

import './index.css';

const PopUp = ({isOpen, children, closePopUp}) => (
    <div className={`popup${ isOpen ? ' open' : ''}`}>
    	<div 
    		className="background"
    		onClick={ closePopUp }
		></div>
        <div className="slot">
            { children }
        </div>
    </div>
);

export default PopUp;