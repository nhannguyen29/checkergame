import React from 'react';
import { Header } from 'semantic-ui-react';

export default class GameTitle extends React.Component {
    render() {
        return (
            <Header className='gameTitle' as='div' style={{ color: "#D32F2F" }} textAlign='center'>
                Checkers
            </Header>
        );
    }
};
