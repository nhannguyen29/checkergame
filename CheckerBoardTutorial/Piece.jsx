import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ItemTypes} from './ItemTypes.jsx';
import {DragSource} from 'react-dnd';
import {selectPos} from './Validation.jsx';

const pieceSource = {
    beginDrag(props) {
        selectPos(props.pos, props.isPlayer1, props.isKing);

        return {};
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    }
}

class Piece extends Component {
    componentDidMount() {
        const {isPlayer1, isKing}  = this.props;

        const img = new Image();
        if (isPlayer1) {
            if (isKing) {
                img.src = './red-king.png';
            }
            else {
                img.src = './red.png';
            }
        }
        else {
            if (isKing) {
                img.src = './black-king.png';
            }
            else {
                img.src = './black.png';
            }        }
        img.onload = () => this.props.connectDragPreview(img);
    }

    render() {
        const {isPlayer1, isKing, connectDragSource, isDragging} = this.props;

        if (isPlayer1) {
            if (isKing) {
                return connectDragSource(
                    <img src='./red-king.png'
                         style={{
                             opacity: isDragging ? 0.5 : 1,
                             cursor: 'move',
                             height: '90%',
                             width: '90%',
                             borderRadius: '50%',
                             border: '0.035em solid #9E9E9E'
                         }}>
                    </img>
                );
            }
            else {
                return connectDragSource(
                    <img src='./red.png'
                         style={{
                             opacity: isDragging ? 0.5 : 1,
                             cursor: 'move',
                             height: '90%',
                             width: '90%',
                             borderRadius: '50%',
                             border: '0.035em solid #9E9E9E'
                         }}>
                    </img>
                );
            }
        }
        else {
            if (isKing) {
                return connectDragSource(
                    <img src='./black-king.png'
                         style={{
                             opacity: isDragging ? 0.5 : 1,
                             cursor: 'move',
                             height: '90%',
                             width: '90%',
                             borderRadius: '50%',
                             border: '0.035em solid #9E9E9E'
                         }}>
                    </img>
                );
            }
            else {
                return connectDragSource(
                    <img src='./black.png'
                         style={{
                             opacity: isDragging ? 0.5 : 1,
                             cursor: 'move',
                             height: '90%',
                             width: '90%',
                             borderRadius: '50%',
                             border: '0.035em solid #9E9E9E'
                         }}>
                    </img>
                );
            }
        }
    }
}

Piece.propTypes = {
    isPlayer1: PropTypes.bool.isRequired,
    pos: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    isKing: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
};

export default DragSource(ItemTypes.PIECE, pieceSource, collect)(Piece);
