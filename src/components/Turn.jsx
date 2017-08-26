import React from 'react';
import { Header } from 'semantic-ui-react';

export default class Turn extends React.Component {
    render() {
        const { isTurn } = this.props;
        const content = isTurn ? "You can go" : "It's not your turn";
        return (
            <Header as='h1' textAlign='center'>
                {content}
            </Header>
        );
    }
};
