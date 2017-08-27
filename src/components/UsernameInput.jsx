import React from 'react';
import { Grid, Form, Segment } from 'semantic-ui-react';

export default class UsernameInput extends React.Component {
    constructor(props) {
        super(props);
    }

    handleOnChange(e) {
        e.preventDefault();
        this.props.setUsername(e.target.value);
    }

    render() {
        return (
            <Form size='large'>
                <Segment stacked>
                    <Form.Input
                        fluid
                        icon='user'
                        iconPosition='left'
                        placeholder='Pick a username'
                        onChange={this.handleOnChange.bind(this)}
                    />
                </Segment>
            </Form>
        );
    }
};
