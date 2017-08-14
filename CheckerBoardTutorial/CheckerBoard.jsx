import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Knight from './Piece.jsx';
import SquareContainer from './SquareContainer.jsx';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class CheckerBoard extends Component {
    renderSquare(i) {
        const x = i % 8;
        const y = Math.floor(i / 8);

        return (
            <div key={i} style={{
                width: '12.5%',
                height: '12.5%'
            }}>
                <SquareContainer x={x} y={y} isPlayer1={true} isKing={this.props.isKing}>
                    {this.renderPiece(x, y)}
                </SquareContainer>
            </div>
        );
    }


    renderPiece(x, y) {
        // WORKING but ONLY FOR ONE PIECE
        // const [posX, posY] = this.props.selectedPos;
        //
        // if (posX == x && posY == y) {
        //     return <Knight isPlayer1={true} pos={[x, y]} isKing={this.props.isKing}/>;
        // }

        if (x % 2 == 0) {
            if (y == 1) {
                return <Knight isPlayer1={false} pos={[x, y]} isKing={this.props.isKing}/>;
            }
            else if (y == 5 || y == 7) {
                return <Knight isPlayer1={true} pos={[x, y]} isKing={this.props.isKing}/>;
            }
        }
        else {
            if (y == 0 || y == 2) {
                return <Knight isPlayer1={false} pos={[x, y]} isKing={this.props.isKing}/>;
            }
            else if (y == 6) {
                return <Knight isPlayer1={true} pos={[x, y]} isKing={this.props.isKing}/>;
            }
        }
    }

    render() {
        const squares = [];
        for (let i = 0; i < 64; i++) {
            squares.push(this.renderSquare(i));
        }

        return (
            <div style={{
                outline: '0.4em solid #212121',
                width: '30em',
                height: '30em',
                display: 'flex',
                flexWrap: 'wrap'
            }}>
                {squares}
            </div>
        );
    }
}

CheckerBoard.propTypes = {
    selectedPos: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    isPlayer1: PropTypes.bool.isRequired,
    isKing: PropTypes.bool.isRequired,
    player1PiecesPos: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number.isRequired).isRequired).isRequired,
    player2PiecesPos: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number.isRequired).isRequired).isRequired,
};

export default DragDropContext(HTML5Backend)(CheckerBoard);
