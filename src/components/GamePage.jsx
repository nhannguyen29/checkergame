import React from 'react';
import { Grid } from 'semantic-ui-react';
import Log from './Log';
import GiveUpButton from './GiveUpButton';
import CheckerBoard from './CheckerBoard';

export default class GamePage extends React.Component {
    render() {
        const { selectedPos, player1PiecesPos, player2PiecesPos, isPlayer1, player1KingPos, player2KingPos } = this.props;
        return (
            <Grid
                textAlign='center'
                style={{ height: '100%' }}
                verticalAlign='middle'
                >
                <Grid.Row>
                    <Grid.Column width={6}>
                        <CheckerBoard
                            selectedPos={selectedPos}
                            player1PiecesPos={player1PiecesPos}
                            player2PiecesPos={player2PiecesPos}
                            isPlayer1={isPlayer1}
                            player1KingPos={player1KingPos}
                            player2KingPos={player2KingPos}
                        />
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
