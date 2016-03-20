import React from 'react';
import { Route, Redirect, IndexRoute } from 'react-router';

// Here we define all our material-ui ReactComponents.
import Master from './components/master';
import DailyPage from './components/daily-page';
import VideosPage from './components/videos-page';



const AppRoutes = (
<Route path = '/' component = {Master} >
    <IndexRoute component={DailyPage} />
    <Route path='daily/:number' component={VideosPage} />
    <Route path='videos/:number' component = {DailyPage} />
</Route>
);

export default AppRoutes;
