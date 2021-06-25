import React, { useState } from 'react';
import './App.css';
import Board from './components/Board';

const PLAYER_1 = 'x';
const PLAYER_2 = 'o';

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

  const [squares, setSquares] = useState(generateSquares());

  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);

  const updateSquare = (id) => {
    let squaresCopy = [
      ...squares
    ];

    // if square is empty and no winner, place X or 0
    let currentSquareCoordinates = squaresCopy[Math.floor(id/3)][id % 3] 
    if (currentSquareCoordinates.value === '' && boardStatus() === null) {
      currentSquareCoordinates.value = currentPlayer;
      if (currentPlayer === PLAYER_1) {
        setCurrentPlayer(PLAYER_2);
      } else if (currentPlayer === PLAYER_2) {
        setCurrentPlayer(PLAYER_1);
      } 
      setSquares(squaresCopy);
    } 
  }
  
  const checkForWinner = ((square1, square2, square3) => {
    if (square1 === square2 && square1 === square3 && square1 !== '') {
      console.log(square1); 
      return square1
    } else {
      return null;
    }
  })

  const boardStatus = () => {

    // # check each row:
    for (let row of squares) {
      console.log(`The row is ${row}`, squares);
      let result = checkForWinner(row[0].value, row[1].value, row[2].value);
      if (result !== null) {
        return result;
      }
    }

    // # check each column:
    for (let j=0; j<3; j++) {
      console.log(`The column is ${j} and the board is ${squares}`);
      let result = checkForWinner(squares[0][j].value, squares[1][j].value, squares[2][j].value);
      if (result !== null) {
        return result;
      }
    }

    // # check diagonals:
    let result = checkForWinner(squares[0][0].value, squares[1][1].value, squares[2][2].value)
    console.log(`Diagonal ${squares[0][0].value}`)
    if (result !== null) {
      return result;
    }
      
    result = checkForWinner(squares[2][0].value, squares[1][1].value, squares[0][2].value)
    if (result !== null) {
      return result;
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
    setSquares(generateSquares())
    setCurrentPlayer(PLAYER_1)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        <h2>Winner is {boardStatus()} </h2>
        <button onClick={() => resetGame()}>Reset Game</button>
      </header>
      <main>
        {/* App component renders a board */}
        <Board squares={squares} onClickCallback={updateSquare}/>
      </main>
    </div>
  );
}

export default App;

