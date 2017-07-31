import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ItemTypes } from './ItemTypes.jsx';
import { DragSource } from 'react-dnd';

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
     const img = new Image();
     img.src = "./red.png";
     img.onload = () => this.props.connectDragPreview(img);
   }

  render() {
    const { connectDragSource, isDragging } = this.props;
    return connectDragSource(
      <img src="./red.png"
          style={{
        opacity: isDragging ? 0.5 : 1,
        borderRadius: 50,
        cursor: 'move'
      }}>
     </img>
    );
  }
}

Knight.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};

export default DragSource(ItemTypes.KNIGHT, knightSource, collect)(Knight);
