import React, { PureComponent, Fragment } from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopUp from './PopUp';
import Options from './Options';

import './App.css';

class App extends PureComponent {
    render() {
        return (
            <Fragment>
                <div className="App">
                    <Header />
                    <Main />
                    {/* <Footer /> */}
                </div>
                <PopUp>
                    <Options />
                </PopUp>
            </Fragment>
        );
    }
}

export default App;