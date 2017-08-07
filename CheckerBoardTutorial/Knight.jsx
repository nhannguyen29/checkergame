import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ItemTypes} from './ItemTypes.jsx';
import {DragSource} from 'react-dnd';

const knightSource = {
    beginDrag(props) {
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

class Knight extends Component {
    componentDidMount() {
        const player1 = this.props.player1;

        const img = new Image();
        if (player1) {
            img.src = './red.png';

        }
        else {
            img.src = './black.png';
        }
        img.onload = () => this.props.connectDragPreview(img);
    }

    render() {
        const {player1, connectDragSource, isDragging} = this.props;

        if (player1) {
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

Knight.propTypes = {
    player1: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
};

export default DragSource(ItemTypes.KNIGHT, knightSource, collect)(Knight);
