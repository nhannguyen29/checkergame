import React from 'react';
import { Card, List } from 'semantic-ui-react';

export default class Log extends React.Component {
    render() {
        return (
            <Card fluid>
                <Card.Content>
                    <Card.Header>
                        Activity Log
                    </Card.Header>
                </Card.Content>
                <Card.Content className="logList">
                    <List items={['Player 1 moved checker piece from (1,2) to (2,3)']} />    
                </Card.Content>
            </Card>
        );
    }
};
