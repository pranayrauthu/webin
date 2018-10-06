import React, { Component } from 'react';

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import AppContext from "./Context/AppContext";
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
      tabs: initialTabs
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
  getProviderValue = () => {
    const { tabs } = this.state;
    const { updateTabs } = this;
    return {
      tabs,
      updateTabs
    }
  }
  render() {
    return (
      <AppContext.Provider value={ this.getProviderValue() }>
        <div className="App">
          <Header></Header>
          <Main></Main>
          <Footer></Footer>
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;
