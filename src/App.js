import React, { useState } from 'react';
import './App.css';
import Board from './components/Board';
// import Square from './components/Square';


const PLAYER_1 = 'x';
const PLAYER_2 = 'o';

// generate a 2 dimensional array of objects, each object has an id and a value
// blank to start with, changes on click (keeps track of the state of the game):
const generateSquares = () => {
  const squares = [];

  let currentId = 0;

  for (let row = 0; row < 3; row += 1) {
    squares.push([]);
    for (let col = 0; col < 3; col += 1) {
      squares[row].push({
        id: currentId,
        value: '',
      });
      currentId += 1;
    }
  }
  return squares;
}

const App = () => {

  // This starts state off as a 2D array of JS objects with
  // empty value and unique ids.
  const [squares, setSquares] = useState(generateSquares());

  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);

  // Wave 2
  // You will need to create a method to change the square 
  //   When it is clicked on.
  //   Then pass it into the squares as a callback

  const updateSquare = (id) => {
    console.log('I am clicked', id);
    let squaresCopy = [
      ...squares
    ];
    console.log(squares);
    console.log('squaresCopy', squaresCopy);

    // if square is empty, place X or 0
    let currentSquareCoordinates = squaresCopy[Math.floor(id/3)][id % 3] 
    if (currentSquareCoordinates.value === '') {
      currentSquareCoordinates.value = currentPlayer;
      if (currentPlayer === PLAYER_1) {
        setCurrentPlayer(PLAYER_2);
      } else if (currentPlayer === PLAYER_2) {
        setCurrentPlayer(PLAYER_1);
      }
      setSquares(squaresCopy);
    } 
  }
  
  const boardStatus = () => {

    // # check each row:
    for (let row of squares) {
      console.log(`The row is ${row}`, squares);
      if (row[0].value === row[1].value && row[0].value === row[2].value) {
        return row[0].value
      }
    }

    // # check each column:
    for (let j=0; j<3; j++) {
      console.log(`The column is ${j} and the board is ${squares}`);
      if (squares[0][j].value === squares[1][j].value && squares[1][j].value === squares[2][j].value) {
        return squares[0][j].value
      }
    }

    // # check diagonals:
    if (squares[0][0].value === squares[1][1].value && squares[1][1].value === squares[2][2].value) {
      console.log(`Diagonal ${squares[0][0].value}`)
      return squares[1][1].value
    }

    if (squares[2][0].value === squares[1][1].value && squares[1][1].value === squares[0][2].value) {
      console.log(`Diagonal ${squares[0][0].value}`)
      return squares[1][1].value
    }

    for (let i=0; i<3; i++) {
      for (let j=0; j<3; j++) {
        if (squares[i][j].value === '') {
          return null
        }
      }
    }
    return 'Tie!'
  }

  const resetGame = () => {
    // Complete in Wave 4
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        <h2>The winner is ... {boardStatus()} </h2>
        <button>Reset Game</button>
      </header>
      <main>
        {/* App component renders a board */}
        <Board squares={squares} onClickCallback={updateSquare}/>
      </main>
    </div>
  );
}

export default App;










// const checkForWinner = ((square1, square2, square3) => {
//   if (square1 === square2 && square1 === square3 && square1 !== '') {
//     console.log(square1); 
//     // lock the board
//     return square1
//   } 
// })

// const boardStatus = () => {

//   // # check each row:
//   for (let row of squares) {
//     console.log(`The row is ${row}`, squares);
//     let result = checkForWinner(row[0].value, row[1].value, row[2].value);
//     if (result !== null) {
//       return result
//     }
//   }

//   for (let row of squares) {
//     console.log(`The row is ${row}`, squares);
//     let result = checkForWinner(row[0].value, row[1].value, row[2].value);
//     if (result !== null) {
//       return result
//     }
//   }

//   // # check each column:
//   for (let j=0; j<3; j++) {
//     console.log(`The column is ${j} and the board is ${squares}`);
//     let result = checkForWinner(squares[0][j].value, squares[1][j].value, squares[2][j].value);
//     if (result !== null) {
//       return result
//     }
//   }

//   // # check diagonals:
//   let result = checkForWinner(squares[0][0].value, squares[1][1].value, squares[2][2].value)
//   console.log(`Diagonal ${squares[0][0].value}`)
//   if (result !== null) {
//     return result
//   }
    
//   result = checkForWinner(squares[2][0].value, squares[1][1].value, squares[0][2].value)
//   if (result !== null) {
//     return result
//   }

//   // # check whether the board contains any empty strings
//   for (let row in squares) {
//     if ('' in row) {
//       return null
//     }
//   }
//   return 'Tie'
// }




