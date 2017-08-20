import React from 'react';
import ReactDOM from 'react-dom';
import CheckerBoard from './CheckerBoard.jsx';
import {observe} from './Validation.jsx';

const rootEl = document.getElementById('app');

observe((selectedPos, player1PiecesPos, player2PiecesPos, isPlayer1, isKing) =>
// observe((player1PiecesPos, player2PiecesPos, isPlayer1, isKing) =>
        ReactDOM.render(
            <CheckerBoard
                selectedPos={selectedPos}
                player1PiecesPos={player1PiecesPos}
                player2PiecesPos={player2PiecesPos}
                isPlayer1={isPlayer1}
                isKing={isKing}/>,
            rootEl
        )
);
