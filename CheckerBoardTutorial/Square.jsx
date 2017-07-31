import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Square extends Component {
   render() {
     const { black } = this.props;
     const backgroundColor = black ? '#212121' : '#FBE9E7';

     return (
       <div
         style={{
           backgroundColor,
           width: '100%',
           height: '100%',
         }}
       >
         {this.props.children}
       </div>
     );
   }
}

Square.propTypes = {
  black: PropTypes.bool
};
