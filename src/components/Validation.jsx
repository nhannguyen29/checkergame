let selectedPos = [0, 7];
let player1PiecesPos = [[0, 5], [0, 7], [1, 6], [2, 5], [2, 7], [3, 6], [4, 5], [4, 7], [5, 6], [6, 5], [6, 7], [7, 6]];
let player2PiecesPos = [[0, 1], [1, 0], [1, 2], [2, 1], [3, 0], [3, 2], [4, 1], [5, 0], [5, 2], [6, 2], [7, 0], [7, 2]];
let isPlayer1 = true;
let isKing = false;
let observer = null;

function emitChange() {
    observer(selectedPos, player1PiecesPos, player2PiecesPos, isPlayer1, isKing);
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

export function canMovePiece(posX, posY, argIsPlayer1, argIsKing) {
    const [x, y] = selectedPos;
    const dx = posX - x;
    const dy = posY - y;

    if (argIsKing) {
        return (Math.abs(dx) == 1 && Math.abs(dy) == 1);
    }

    if (argIsPlayer1) {
        return ((dx == 1 || dx == -1) && dy == -1);
    }
}

export function isKingPos(posX, posY, argIsPlayer1) {
    if (argIsPlayer1) {
        if (posY == 0) {
            isKing = true;
        }
    }
}

export function assignMovedPos(posX, posY) {
    selectedPos = [posX, posY];
    emitChange();
}

export function removePiece(posX, posY, argIsPlayer1) {

}
