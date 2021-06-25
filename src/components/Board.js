import React from 'react';
import './Board.css';
import Square from './Square';
import PropTypes from 'prop-types';


// The board component takes a 2d array of squares and returns it into one dimensional array of JSX
const generateSquareComponents = (squares, onClickCallback) => {

  let squareList = []

  for (let i = 0; i < squares.length; i++) {
    squareList = squareList.concat(squares[i]);
  }

  return squareList.map((square) => {
    return (
    <Square key={square.id} id={square.id} value={square.value} onClickCallback={onClickCallback}></Square>
    )
  })  
}

const Board = (props) => {
  const squareList = generateSquareComponents(props.squares, props.onClickCallback);
  return <div className="grid" >
    {/* show 1d array here */}
    {squareList}
  </div>
}

Board.propTypes = {
  squares: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        value: PropTypes.string.isRequired
      })
    )
  ),
  onClickCallback: PropTypes.func.isRequired,
};

export default Board;
