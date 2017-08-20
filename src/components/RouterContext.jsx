import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import LobbyPage from './LobbyPage';
import GamePage from './GamePage';
import App from './App';

export default class RouterContext extends React.Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={LobbyPage} />
                    <Route path="game" component={GamePage} />
                </Route>
            </Router>
        );
    }
};
