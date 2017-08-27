import React from 'react';
import { Card, List } from 'semantic-ui-react';

export default class Log extends React.Component {
    render() {
        const { logItems } = this.props;
        return (
            <Card fluid>
                <Card.Content>
                    <Card.Header>
                        Activity Log
                    </Card.Header>
                </Card.Content>
                <Card.Content className="logList" style={{ overflowY: 'auto' }}>
                    <List divided relaxed items={logItems}></List>
                </Card.Content>
            </Card>
        );
    }
};
