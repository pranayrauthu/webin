import React from 'react';
import { connect } from 'react-redux';

import './index.css';

/**@typedef {import('./../utils/store').ReduxStore} ReduxStore*/
/**@typedef {import('react').Props} Props*/


/**
 * @typedef {MapDispatchProps & MapStateProps & Props} PopUpProps
 */

/**
 * 
 * @param {PopUpProps} props
 * @returns {import('react').ReactElement<PopUpProps>}
 */
const PopUp = ({ isOpen, children, closePopUp }) => (
    <div className={`popup${isOpen ? '' : ' close'}`}>
        <div
            className="background"
            onClick={closePopUp}
        ></div>
        <div className="slot">
            {children}
        </div>
    </div>
);

/**
 * @typedef {Object} MapStateProps
 * @property {boolean} isOpen
 */

/**
 * 
 * @param {ReduxStore} state 
 * @returns {MapStateProps}
 */
const mapState = (state) => ({
    isOpen: (state.app.optionsPopup.state === 'open')
});

/**
 * @typedef {Object} MapDispatchProps
 * @property {React.MouseEventHandler} closePopUp
 */

/**
 * 
 * @param {function} dispatch 
 * @returns {MapDispatchProps}
 */
const mapDispatch = (dispatch) => ({
    closePopUp: () => {
        dispatch({
            type: 'TOGGLE_OPTIONS'
        });
    }
});

export default connect(mapState, mapDispatch)(PopUp);