import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './css/bootstrap.min.css';
import './index.css';
import App from './App';
import store from './store';

import registerServiceWorker from './registerServiceWorker';



ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
