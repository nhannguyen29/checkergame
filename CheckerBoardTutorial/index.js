import React from 'react';
import ReactDOM from 'react-dom';
import CheckerBoard from './CheckerBoard.jsx';

const rootEl = document.getElementById('app');

observe((selectedPos, player1PiecesPos, player2PiecesPos, isPlayer1, player1KingPos, player2KingPos) =>
// observe((player1PiecesPos, player2PiecesPos, isPlayer1, isKing) =>
        ReactDOM.render(
            <CheckerBoard
                selectedPos={selectedPos}
                player1PiecesPos={player1PiecesPos}
                player2PiecesPos={player2PiecesPos}
                isPlayer1={isPlayer1}
                player1KingPos={player1KingPos}
                player2KingPos={player2KingPos}
            />,
            rootEl
        )
);
