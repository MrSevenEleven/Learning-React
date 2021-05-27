import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home'
import {BrowserRouter as Router, Link, Switch,Route,useHistory,withRouter} from 'react-router-dom';

ReactDOM.render(
    <Router>
        <Home />
    </Router>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
