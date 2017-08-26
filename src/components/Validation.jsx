let player1PiecesPos = [[0, 5], [2, 5], [4, 5], [6, 5], [1, 6], [3, 6], [5, 6], [7, 6], [0, 7], [2, 7], [4, 7], [6, 7]];
let player2PiecesPos = [[1, 0], [3, 0], [5, 0], [7, 0], [0, 1], [2, 1], [4, 1], [6, 1], [1, 2], [3, 2], [5, 2], [7, 2]];
let player1KingPos = [false, false, false, false, false, false, false, false, false, false, false, false];
let player2KingPos = [false, false, false, false, false, false, false, false, false, false, false, false];
let isPlayer1 = true;
let observer = null;
let log = []; 

let selectedPos = [0, 0];
let isKing = false;
let turnedKing = false;
let pieceBelongsToPlayer = 0;
let capturedPiece = [];
let jumpPos = [];
let jumpOverPlayer1 = false;
let captureFlag = false;
let captureCount = 0;
let continueCapture = false;
let playerTurn = 2;

function emitChange() {
    observer(log, playerTurn, selectedPos, player1PiecesPos, player2PiecesPos, isPlayer1, player1KingPos, player2KingPos);
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
    let [x, y] = selectedPos;
    let dx = posX - x;
    let dy = posY - y;

    if (isPlayer1 && playerTurn !== 1) {
        return false;
    }
    else if (!isPlayer1 && playerTurn !== 2) {
        return false;
    }

    if (isJumpSquareEmpty(posX, posY, dx, dy)) { // if the square can be legally jumped to for capturing
        return true;
    }
    else if (isSquareEmpty(posX, posY) && !continueCapture) { // if square has a piece on it
        return canMoveToRange(dx, dy, 1);
    }
    else { // square does not have a piece, move normally
        return false;
    }
}

function inspectPos(pos) {
    let i = player1PiecesPos.findIndex(function (n) {
        return pos.every(function (p, q) {
            return p === n[q]
        });
    });

    if (i !== -1) { // if position is found in player 1 array of positions
        pieceBelongsToPlayer = 1;

        return i;
    }

    i = player2PiecesPos.findIndex(function (n) {
        return pos.every(function (p, q) {
            return p === n[q]
        });
    });

    if (i !== -1) { // if position is found in player 2 array of positions
        pieceBelongsToPlayer = 2;

        return i;
    }

    return -1; // nothing is found meaning the position is of an empty square
}

function canMoveToRange(dx, dy, range) {
    if (isKing) {
        return (Math.abs(dx) === range && Math.abs(dy) === range); // king can move 1 square diagonally upward and downward
    }

    if (isPlayer1) {
        return ((dx === range || dx === (range * -1)) && dy === (range * -1)); // red can move 1 square diagonally upward
    }
    else {
        return ((dx === range || dx === (range * -1)) && dy === range); // red can move 1 square diagonally upward
    }
}

function isJumpSquareEmpty(posX, posY, dx, dy) {
    // starting at the square that is supposed to be jump-able
    if (posX < 0 || posX > 7 || posY < 0 || posY > 7) {
        return false;
    }

    if (isSquareEmpty(posX, posY) && Math.abs(dx) === 2 && Math.abs(dy) === 2) {
        let [x, y] = selectedPos;
        let leftX = posX - 1;
        let rightX = posX + 1;
        let bottomY = posY + 1;
        let aboveY = posY - 1;

        if (!isKing) {
            if (isPlayer1) {
                if (!isSquareEmpty(leftX, bottomY) && (leftX - 1 === x) && (bottomY + 1 === y) && canCapture()) { // red piece is to the left below black piece
                    console.log("red piece is to the left below black piece: ", posX, posY);
                    jumpPos = [posX, posY];
                    jumpOverPlayer1 = false;
                    capturedPiece = [leftX, bottomY];
                    return canMoveToRange(dx, dy, 2) // the selected piece is at the correct range
                }

                if (!isSquareEmpty(rightX, bottomY) && (rightX + 1 === x) && (bottomY + 1 === y) && canCapture()) { // red piece is to the right below black piece
                    console.log("red piece is to the right below black piece: ", posX, posY);
                    jumpPos = [posX, posY];
                    jumpOverPlayer1 = false;
                    capturedPiece = [rightX, bottomY];
                    return canMoveToRange(dx, dy, 2) // the selected piece is at the correct range
                }
            } else {
                if (!isSquareEmpty(leftX, aboveY) && (leftX - 1 === x) && (aboveY - 1 === y) && canCapture()) { // black piece is to the right above red piece
                    console.log("black piece is to the left above red piece: ", posX, posY);
                    jumpPos = [posX, posY];
                    jumpOverPlayer1 = true;
                    capturedPiece = [leftX, aboveY];
                    return canMoveToRange(dx, dy, 2) // the selected piece is at the correct range
                }

                if (!isSquareEmpty(rightX, aboveY) && (rightX + 1 === x) && (aboveY - 1 === y) && canCapture()) { // black piece is to the right above red piece
                    console.log("black piece is to the right above red piece: ", posX, posY);
                    jumpPos = [posX, posY];
                    jumpOverPlayer1 = true;
                    capturedPiece = [rightX, aboveY];
                    return canMoveToRange(dx, dy, 2) // the selected piece is at the correct range
                }
            }
        } else {
            if (!isSquareEmpty(leftX, bottomY) && (leftX - 1 === x) && (bottomY + 1 === y) && canCapture()) { // red piece is to the left below black piece
                console.log("K piece is to the left below: ", posX, posY);
                jumpPos = [posX, posY];
                if (isPlayer1) {
                    jumpOverPlayer1 = false;
                }
                else {
                    jumpOverPlayer1 = true;
                }
                capturedPiece = [leftX, bottomY];
                return canMoveToRange(dx, dy, 2) // the selected piece is at the correct range
            }

            if (!isSquareEmpty(leftX, aboveY) && (leftX - 1 === x) && (aboveY - 1 === y) && canCapture()) { // red piece is to the left above black piece
                console.log("K piece is to the left above: ", posX, posY);
                jumpPos = [posX, posY];
                if (isPlayer1) {
                    jumpOverPlayer1 = false;
                }
                else {
                    jumpOverPlayer1 = true;
                }
                capturedPiece = [leftX, aboveY];
                return canMoveToRange(dx, dy, 2) // the selected piece is at the correct range
            }

            if (!isSquareEmpty(rightX, bottomY) && (rightX + 1 === x) && (bottomY + 1 === y) && canCapture()) { // red piece is to the right below black piece
                console.log("K piece is to the right below: ", posX, posY);
                jumpPos = [posX, posY];
                if (isPlayer1) {
                    jumpOverPlayer1 = false;
                }
                else {
                    jumpOverPlayer1 = true;
                }
                capturedPiece = [rightX, bottomY];
                return canMoveToRange(dx, dy, 2) // the selected piece is at the correct range
            }

            if (!isSquareEmpty(rightX, aboveY) && (rightX + 1 === x) && (aboveY - 1 === y) && canCapture()) { // red piece is to the right above black piece
                console.log("K piece is to the right above: ", posX, posY);
                jumpPos = [posX, posY];
                if (isPlayer1) {
                    jumpOverPlayer1 = false;
                }
                else {
                    jumpOverPlayer1 = true;
                }
                capturedPiece = [rightX, aboveY];
                return canMoveToRange(dx, dy, 2) // the selected piece is at the correct range
            }
        }
    }

    return false;
}

function isSquareEmpty(posX, posY) {
    let pos = [posX, posY];
    let i = inspectPos(pos);

    if (i === -1) { // position does not belong to any element in both arrays, meaning it is an empty square
        return true;
    }
    else {
        return false;
    }
}

function canCapture() {
    if (isPlayer1 && pieceBelongsToPlayer === 1) { // same red piece
        return false;
    }
    else if (isPlayer1 && pieceBelongsToPlayer === 2) { // red captures black
        return true;
    }
    else if (!isPlayer1 && pieceBelongsToPlayer === 1) { // black captures red
        return true;
    }
    else if (!isPlayer1 && pieceBelongsToPlayer === 2) { // same black piece
        return false;
    }
}

export function assignMovedPos(posX, posY) {
    let i = inspectPos(selectedPos); // find array index of the selected position

    // assign new position in position arrays
    if (isPlayer1) {
        player1PiecesPos[i] = [posX, posY]; // assign new position to the indexed element

        isKingPos(posY, i); // check if the new position can be king casted
    }
    else {
        player2PiecesPos[i] = [posX, posY]; // assign new position to the indexed element

        isKingPos(posY, i); // check if the new position can be king casted
    }

    let pos = [posX, posY];

    // check whether capture move is made
    if (compareArrays(jumpPos, pos) && capturedPiece.length !== 0) { // if jump move is made and capture piece is targeted
        captureFlag = true;
    }

    capturePiece();
    
    if (!turnedKing) {
        // if capture move is still legal, keep the same player turn. else switch turn to the other player
        selectedPos = [posX, posY];

        if (!isKing) {
            if (isPlayer1) {
                if ((isJumpSquareEmpty(posX + 2, posY - 2, 2, -2)
                        || isJumpSquareEmpty(posX - 2, posY - 2, -2, -2))
                    && captureCount > 0) { // enable double, triple, quad jumps
                    continueCapture = true;
                    playerTurn = 1; // can still make another capture move
                }
                else {
                    continueCapture = false;
                    captureCount = 0;
                    playerTurn = 2;
                }
            }
            else {
                if ((isJumpSquareEmpty(posX + 2, posY + 2, 2, 2)
                        || isJumpSquareEmpty(posX - 2, posY + 2, -2, 2))
                    && captureCount > 0) { // enable double, triple, quad jumps
                    continueCapture = true;
                    playerTurn = 2; // can still make another capture move
                }
                else {
                    continueCapture = false;
                    captureCount = 0;
                    playerTurn = 1;
                }
            }
        }
        else if (isKing && isPlayer1) {
            if ((isJumpSquareEmpty(posX + 2, posY + 2, 2, 2)
                    || isJumpSquareEmpty(posX - 2, posY + 2, -2, 2)
                    || isJumpSquareEmpty(posX + 2, posY - 2, 2, -2)
                    || isJumpSquareEmpty(posX - 2, posY - 2, -2, -2))
                && captureCount > 0) { // enable double, triple, quad jumps
                continueCapture = true;
                playerTurn = 1; // can still make another capture move
            }
            else {
                continueCapture = false;
                captureCount = 0;
                playerTurn = 2;
            }
        }
        else if (isKing && !isPlayer1) {
            if ((isJumpSquareEmpty(posX + 2, posY + 2, 2, 2)
                    || isJumpSquareEmpty(posX - 2, posY + 2, -2, 2)
                    || isJumpSquareEmpty(posX + 2, posY - 2, 2, -2)
                    || isJumpSquareEmpty(posX - 2, posY - 2, -2, -2))
                && captureCount > 0) { // enable double, triple, quad jumps
                continueCapture = true;
                playerTurn = 2; // can still make another capture move
            }
            else {
                continueCapture = false;
                captureCount = 0;
                playerTurn = 1;
            }
        }
    }
    else {
        if (isPlayer1) {
            playerTurn = 2;
        }
        else {
            playerTurn = 1;
        }

        continueCapture = false;
        captureCount = 0;
        turnedKing = false;
    }
    emitChange();
}

function isKingPos(posY, i) {
    if (isPlayer1) {
        if (posY === 0) { // piece position is at top row
            isKing = true;

            player1KingPos[i] = true;

            turnedKing = true;
        }
    }
    else {
        if (posY === 7) { // piece position is at bottom row
            isKing = true;

            player2KingPos[i] = true;

            turnedKing = true;
        }
    }
}

function capturePiece() {
    if (captureFlag
        && ((isPlayer1 && !jumpOverPlayer1) || (!isPlayer1 && jumpOverPlayer1))) {
        let i = inspectPos(capturedPiece);

        if (isPlayer1) {
            player2PiecesPos[i] = [-1, -1];
        }
        else {
            player1PiecesPos[i] = [-1, -1];
        }

        capturedPiece = [];
        jumpPos = [];
        captureFlag = false;
        captureCount = captureCount + 1;
    } else {
        capturedPiece = [];
        jumpPos = [];
        captureFlag = false;
        captureCount = 0;
    }
}

function compareArrays(a1, a2) {
    return (a1.length == a2.length) && a1.every(function (element, index) {
        return element === a2[index];
    });
}
