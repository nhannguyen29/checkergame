let player1PiecesPos = [[0, 5], [2, 5], [4, 5], [6, 5], [1, 6], [3, 6], [5, 6], [7, 6], [0, 7], [2, 7], [4, 7], [6, 7]];
let player2PiecesPos = [[1, 0], [3, 0], [5, 0], [7, 0], [0, 1], [2, 1], [4, 1], [6, 1], [1, 2], [3, 2], [5, 2], [7, 2]];
let player1KingPos = [false, false, false, false, false, false, false, false, false, false, false, false];
let player2KingPos = [false, false, false, false, false, false, false, false, false, false, false, false];
let isPlayer1 = true;
let observer = null;

let selectedPos = [0, 0];
let isKing  = false;

function emitChange() {
    observer(selectedPos, player1PiecesPos, player2PiecesPos, isPlayer1, player1KingPos, player2KingPos);
}

export function observe(o) {
    if (observer) {
        throw new Error('Multiple observers not implemented.');
    }

    observer = o;
    emitChange();

    return () => {
        observer = null;
    };
}

export function selectPos(pos, argIsPlayer1, argIsKing) {
    selectedPos = pos;
    isPlayer1 = argIsPlayer1;
    isKing = argIsKing;

    emitChange();
}

export function canMovePiece(posX, posY) {
    const [x, y] = selectedPos;
    const dx = posX - x;
    const dy = posY - y;

    if (isKing) {
        return (Math.abs(dx) === 1 && Math.abs(dy) === 1);
    }

    if (isPlayer1) {
        return ((dx === 1 || dx === -1) && dy === -1);
    }
    else {
        return ((dx === 1 || dx === -1) && dy === 1);
    }
}

function isKingPos(posY, i) {
    if (isPlayer1) {
        if (posY === 0) { // piece position is at top row
            isKing = true;

            player1KingPos[i] = true;
        }
    }
    else {
        if (posY === 7) { // piece position is at bottom row
            isKing = true;

            player2KingPos[i] = true;
        }
    }
}

export function assignMovedPos(posX, posY) {
    if (isPlayer1) {
        var i = player1PiecesPos.findIndex(function(n) {
            return selectedPos.every(function(p, q) {
                return p === n[q]
            });
        });

        player1PiecesPos[i] = [posX, posY];

        isKingPos(posY, i);
    }
    else {
        var i = player2PiecesPos.findIndex(function(n) {
            return selectedPos.every(function(p, q) {
                return p === n[q]
            });
        });

        player2PiecesPos[i] = [posX, posY];

        isKingPos(posY, i);
    }

    console.log("i: ", i, " pos[]: ", [posX, posY]);

    emitChange();
}

export function capturePiece(posX, posY, argIsPlayer1) {

}
