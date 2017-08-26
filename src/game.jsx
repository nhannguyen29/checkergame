import React from 'react';
import ReactDOM from 'react-dom';
import GamePage from './components/GamePage';
import {observe} from './components/Validation';

const app = document.getElementById('app');

observe((selectedPos, player1PiecesPos, player2PiecesPos, isPlayer1, player1KingPos, player2KingPos) =>
    ReactDOM.render(
        <GamePage
        selectedPos={selectedPos}
        player1PiecesPos={player1PiecesPos}
        player2PiecesPos={player2PiecesPos}
        isPlayer1={isPlayer1}
        player1KingPos={player1KingPos}
        player2KingPos={player2KingPos}
        />,
        app
    )
);
