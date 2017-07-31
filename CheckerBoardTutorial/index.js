import React from 'react';
import ReactDOM from 'react-dom';
import Board from './Board.jsx';
import { observe } from './Game.jsx';

const rootEl = document.getElementById('app');

observe(knightPosition =>
  ReactDOM.render(
    <Board knightPosition={knightPosition} />,
    rootEl
  )
);
