import React from 'react';
import { Header } from 'semantic-ui-react';

export default class GameTitle extends React.Component {
    render() {
        return (
            <Header className='gameTitle' as='div' color='teal' textAlign='center'>
                Checkers
            </Header>
        );
    }
};
