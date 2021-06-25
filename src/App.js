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

  const [playerOneName, setPlayerOneName] = useState('');

  const [playerTwoName, setPlayerTwoName] = useState('');

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

  const nameWinner = () => {
    let winner = boardStatus();
    if (winner === 'Tie!') {
      return 'Tie!';
    } else if (winner === 'x') {
      if (playerOneName !== '') {
        return playerOneName;
      } else {
        return winner;
      }
    } else if (winner === 'o') {
      if (playerTwoName !== '') {
        return playerTwoName;
      } else {
        return winner;
      }
    }
  }

  const resetGame = () => {
    setSquares(generateSquares())
    setCurrentPlayer(PLAYER_1)
    setPlayerOneName('')
    setPlayerTwoName('')
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        <label className="Label">Player 1 -
          <input type='text' value={playerOneName} onChange={(event) => setPlayerOneName(event.target.value)}/>
        </label>
        <label className="Label">Player 2 -
          <input type='text'  value={playerTwoName} onChange={(event) => setPlayerTwoName(event.target.value)}/>
        </label>
        <h2>Winner is {nameWinner()} </h2>
        <button onClick={resetGame}>Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={updateSquare}/>
      </main>
    </div>
  );
}

export default App;

