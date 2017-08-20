import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Piece from './Piece.jsx';
import SquareContainer from './SquareContainer.jsx';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class CheckerBoard extends Component {
    renderSquare(i) {
        const x = i % 8;
        const y = Math.floor(i / 8);

        // console.log("X: ", x);
        // console.log("Y: ", y);

        return (
            <div key={i} style={{
                width: '12.5%',
                height: '12.5%'
            }}>
                <SquareContainer x={x} y={y}
                                 isPlayer1={this.props.isPlayer1}
                    // isKing={this.props.isKing}
                    // player1PiecesPos={this.props.player1PiecesPos}
                    // player2PiecesPos={this.props.player2PiecesPos}>
                >
                    {this.renderPiece(x, y)}
                </SquareContainer>
            </div>
        );
    }

    renderPiece(x, y) {
        var piece = [x, y];
        var pieces = [];

        try {
            pieces = this.props.player1PiecesPos;
            var i = pieces.findIndex(function (n) {
                return piece.every(function (p, q) {
                    return p === n[q]
                });
            });

            if (i != -1) {
                return <Piece isPlayer1={true} pos={[x, y]}/>;
            }
        } catch (err) {
        }

        try {
            pieces = this.props.player2PiecesPos;
            var i = pieces.findIndex(function (n) {
                return piece.every(function (p, q) {
                    return p === n[q]
                });
            });

            if (i != -1) {
                return <Piece isPlayer1={false} pos={[x, y]}/>;
            }
        } catch (err) {
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
    player2PiecesPos: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number.isRequired).isRequired).isRequired
};

export default DragDropContext(HTML5Backend)(CheckerBoard);
