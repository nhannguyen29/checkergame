import React from 'react';
import { Grid } from 'semantic-ui-react';
import Log from './Log';
import GiveUpButton from './GiveUpButton';
import CheckerBoard from './CheckerBoard';

export default class GamePage extends React.Component {
    render() {
        return (
            <Grid
                textAlign='center'
                style={{ height: '100%' }}
                verticalAlign='middle'
                >
                <Grid.Row>
                    <Grid.Column width={6}>
                        <CheckerBoard /> 
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Log />
                        <GiveUpButton />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
};
