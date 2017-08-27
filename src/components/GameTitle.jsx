import React from 'react';
import { Header } from 'semantic-ui-react';

export default class GameTitle extends React.Component {
    render() {
        return (
            <Header className='gameTitle' as='div' style={{ color: "#B71C1C" }} textAlign='center'>
                Checkers
            </Header>
        );
    }
};
