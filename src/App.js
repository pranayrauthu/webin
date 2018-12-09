import React, { Component } from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopUp from './PopUp';
import Options from './Options';
import AppContext from './Context/AppContext';
import { getWebinOptions, saveWebinOptions } from './webin_settings';

import './App.css';

const initialTabs = {
    html: {
        selected: true
    },
    javascript: {
        selected: false
    },
    css: {
        selected: false
    },
    output: {
        selected: true
    },
    console: {
        selected: false
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: initialTabs,
            optionsPopup: {
                state: 'closed'
            },
            webin_settings: getWebinOptions()
        }
    }
    updateTabs = (tab) => {
        this.setState({
            tabs: Object.assign({}, this.state.tabs, {
                [tab]: {
                    selected: !this.state.tabs[tab].selected
                }
            })
        });
    }
    toggleOptionsTab = () => {
        let state = 'closed';
        if (this.state.optionsPopup.state === 'closed') {
            state = 'open';
        }
        this.setState({
            optionsPopup: {
                state
            }
        });
    }
    updateWebinSettings = (webin_settings) => {
        this.setState({
            webin_settings
        });
        saveWebinOptions(webin_settings);
    }
    getProviderValue = () => {
        const { tabs, webin_settings } = this.state;
        const { updateTabs, toggleOptionsTab, updateWebinSettings } = this;
        return {
            tabs,
            updateTabs,
            toggleOptionsTab,
            webin_settings,
            updateWebinSettings
        }
    }
    getPopupComponent() {
        const shouldShowPopup = this.state.optionsPopup.state === 'open';
        if (shouldShowPopup) {
            return (
                <PopUp closePopUp={ this.toggleOptionsTab }>
                    <Options />
                </PopUp>
            );
        }
        return null;
    }
    render() {
        return (
            <AppContext.Provider value={ this.getProviderValue() }>
              <div className="App">
                <Header />
                <Main />
                <Footer />
              </div>
              {  this.getPopupComponent() }
            </AppContext.Provider>
        );
    }
}

export default App;