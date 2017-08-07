import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Knight from './Knight.jsx';
import BoardSquare from './BoardSquare.jsx';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class Board extends Component {
    renderSquare(i) {
        const x = i % 8;
        const y = Math.floor(i / 8);
        // console.log(x);
        // console.log(y);
        return (
            <div key={i} style={{
                     width: '12.5%',
                     height: '12.5%'}}>
                <BoardSquare x={x} y={y}>
                    {this.renderPiece(x, y)}
                </BoardSquare>
            </div>
        );
    }

    renderPiece(x, y) {
        const [posX, posY] = this.props.topLeftPiecePos;
        if (x % 2 == 0) {
            if (y == 1) {
                return <Knight player1={false}/>;
            }
            else if (y == 5 || y == 7) {
                return <Knight player1={true}/>;
            }
        }
        else {
            if (y == 0 || y == 2) {
                return <Knight player1={false}/>;
            }
            else if (y == 6) {
                return <Knight player1={true}/>;
            }
        }

        // if (x ===  posX + 2 || x === posX + )
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

Board.propTypes = {
    topLeftPiecePos: PropTypes.arrayOf(
        PropTypes.number.isRequired
    ).isRequired
};

export default DragDropContext(HTML5Backend)(Board);
