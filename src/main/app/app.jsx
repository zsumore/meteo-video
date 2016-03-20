import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory } from 'react-router'
import AppRoutes from './app-routes';


ReactDOM.render(
    <Router
    history={hashHistory} routes={AppRoutes}
    onUpdate={() => window.scrollTo(0, 0)}
    />
    , document.getElementById('app'));


