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

    // Complete in Wave 3
    // You will need to:
    // 1. Go accross each row to see if 
    //    3 squares in the same row match
    //    i.e. same value
    // 2. Go down each column to see if
    //    3 squares in each column match
    // 3. Go across each diagonal to see if 
    //    all three squares have the same value.

  const checkForWinner = ((square1, square2, square3) => {
    if (square1 === square2 && square1 === square3 && square1 !== '') {
      console.log(square1); 
      // lock the board
      return square1
    } 
  })
  
  const boardStatus = (board => {
    console.log(`MAIN board`, board)

    // # 1. There is a winning combination on the board

    // # check each row:
    for (let row of board) {
      console.log(`The row is ${row}`, board);
      let result = checkForWinner(row[0].value, row[1].value, row[2].value);
      if (result !== null) {
        return result
      }
    }

    // # check each column:
    for (let j=0; j<3; j++) {
      console.log(`The column is ${j} and the board is ${board}`);
      let result = checkForWinner(board[0][j].value, board[1][j].value, board[2][j].value);
      if (result !== null) {
        return result
      }
    }

    // # check diagonals:
    let result = checkForWinner(board[0][0].value, board[1][1].value, board[2][2].value)
    console.log(`Diagonal ${board[0][0].value}`)
    if (result !== null) {
      return result
    }
      
    result = checkForWinner(board[2][0].value, board[1][1].value, board[0][2].value)
    if (result !== null) {
      return result
    }

    // # 2. There is no winning combination on the board

    // # check whether the board contains any empty strings
    for (let row in board) {
      if ('' in row) {
        return null
      }
    }
    return 'Tie'
  })

  const resetGame = () => {
    // Complete in Wave 4
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        <h2>The winner is ... {boardStatus(squares)} </h2>
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




