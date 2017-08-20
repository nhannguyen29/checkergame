import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import LobbyPage from './LobbyPage';
import App from './App';

export default class RouterContext extends React.Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={LobbyPage} />
                </Route>
            </Router>
        );
    }
};
