import React from 'react';
import './Board.css';
import Square from './Square';
import PropTypes from 'prop-types';

// The board component takes a 2d array of squares and returns it into one 
// dimensional array of JSX
const generateSquareComponents = (squares, onClickCallback) => {
  // Complete this for Wave 1
  // squares is a 2D Array, but 
  //  you need to return a 1D array
  //  of square components
    console.log(squares)

    let squareComponents = []
    for (let i = 0; i < squares.length; i++) {
      squareComponents = squareComponents.concat(squares[i]);
    }
    console.log(squareComponents)

  return squareComponents.map(square => {
    return (
    <Square id={square.id} value={square.value} onclick={onClickCallback}></Square>
    )
  })  
}


    

// for loop for 1d array, then map : iterates throught elements and generates response 

const Board = ({ squares, onClickCallback }) => {
  const squareList = generateSquareComponents(squares, onClickCallback);
  console.log(squareList);
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
