import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Square from './Square.jsx';
import {canMoveKnight, moveKnight} from './Game.jsx';
import {ItemTypes} from './ItemTypes.jsx';
import {DropTarget} from 'react-dnd';

const squareTarget = {
    canDrop(props) {
        return canMoveKnight(props.x, props.y);
    },

    drop(props) {
        moveKnight(props.x, props.y);
    }
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    };
}

class BoardSquare extends Component {
    renderOverlay(color) {
        return (
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: '100%',
                zIndex: 1,
                opacity: 0.8,
                backgroundColor: color,
            }}/>
        );
    }

    render() {
        const {x, y, connectDropTarget, isOver, canDrop} = this.props;
        const black = (x + y) % 2 === 1;

        return connectDropTarget(
            <div style={{
                position: 'relative',
                width: '100%',
                height: '100%'
            }}>
                <Square black={black}>
                    {this.props.children}
                </Square>
                {isOver && !canDrop && this.renderOverlay('#F44336')}
                {!isOver && canDrop && this.renderOverlay('#9CCC65')}
                {isOver && canDrop && this.renderOverlay('#64DD17')}
            </div>
        );
    }
}

BoardSquare.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired
};

export default DropTarget(ItemTypes.KNIGHT, squareTarget, collect)(BoardSquare);
