import React from 'react';
import { Grid, Form, Segment } from 'semantic-ui-react';

export default class UsernameInput extends React.Component {
    render() {
        return (
            <Form size='large'>
                <Segment stacked>
                    <Form.Input
                        fluid
                        icon='user'
                        iconPosition='left'
                        placeholder='Pick a username'
                    />
                </Segment>
            </Form>
        );
    }
};
