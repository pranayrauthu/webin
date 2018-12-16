import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './utils/initStore';
import './index.css';
import App from './App';

const app = document.getElementById('root');
ReactDOM.render(
    (<Provider store={store}>
        <App />
    </Provider>),
    app
);