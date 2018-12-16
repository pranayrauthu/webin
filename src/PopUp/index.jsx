import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './index.css';

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

PopUp.propTypes = {
    ipOpen: PropTypes.bool
};

const mapState = (state) => ({
    isOpen: (state.app.optionsPopup.state === 'open')
});

const mapDispatch = (dispatch) => ({
    closePopUp: () => {
        dispatch({
            type: 'TOGGLE_OPTIONS'
        });
    }
});

export default connect(mapState, mapDispatch)(PopUp);