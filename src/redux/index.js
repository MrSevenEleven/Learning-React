import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import APP from './app'
import {store} from './store'

ReactDOM.render(
    <Provider value={store}>
        <APP />
    </Provider>,
    document.getElementById('root')
);