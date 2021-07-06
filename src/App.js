import './App.css';
import SquareComponent from './SquareComponent.js';
import { Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';


function App() {

  // Function to generate random number 
  function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // const initState = Array.from(Array(9).keys())
  const initState = ["X", "", "", "", "", "", "", "", "", ""];
  const initWin = ("")
  const [gameState, updateGameState] = useState(initState)
  const [isXTurn, updateIsXTurn] = useState(false)
  const [whoWin, updateWhoWin] = useState("")

  const onSquareClicked = (i) => {
    let strings = Array.from(gameState)
    if (strings[i]) return
    strings[i] = isXTurn ? "X" : "0"
    updateGameState(strings)
    updateIsXTurn(!isXTurn)
  }

  const aiMoves = () => {
    let randomNum = randomNumber(1, 8)
    let flag = true
    while (flag) {
      if (gameState[randomNum] === "") {
        let strings = Array.from(gameState)
        strings[randomNum] = "X"
        updateGameState(strings)
        updateIsXTurn(!isXTurn)
        flag = false
      } else {
        randomNum = randomNumber(1, 8)
      }
    }
  }

  function minimax(board){
    // TODO
  }

  useEffect(() => {
    const winner = checkWinner()
    if (winner) {
      updateWhoWin(`${winner}`)
    }
    if (isXTurn) {
      aiMoves()
    }
  }, [gameState, isXTurn])

  const checkWinner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
        return gameState[a]
      }
    }
    return null;
  }

  return (
    <div className="header">
      <p className="header-text">Tic Tac Toe</p>
      <div className="row jc-center">
        <SquareComponent className='b-bottom-right' state={gameState[0]} onClick={() => onSquareClicked(0)} />
        <SquareComponent className="b-bottom-right" state={gameState[1]} onClick={() => onSquareClicked(1)} />
        <SquareComponent className="b-bottom" state={gameState[2]} onClick={() => onSquareClicked(2)} />
      </div>
      <div className="row jc-center">
        <SquareComponent className="b-bottom-right" state={gameState[3]} onClick={() => onSquareClicked(3)} />
        <SquareComponent className="b-bottom-right" state={gameState[4]} onClick={() => onSquareClicked(4)} />
        <SquareComponent className="b-bottom" state={gameState[5]} onClick={() => onSquareClicked(5)} />
      </div>
      <div className="row jc-center">
        <SquareComponent className="b-right" state={gameState[6]} onClick={() => onSquareClicked(6)} />
        <SquareComponent className="b-right" state={gameState[7]} onClick={() => onSquareClicked(7)} />
        <SquareComponent state={gameState[8]} onClick={() => onSquareClicked(8)} />
      </div>
      <Button variant="primary" className="clear-button" onClick={() => {
        updateGameState(initState)
        updateWhoWin(initWin)
      }}>Clear Game</Button>
      {whoWin && (
        <div>
          <p className="fc-aqua fw-600" style={{ marginTop: '0.2rem' }}>Winner: {whoWin}</p>
        </div>
      )}
    </div>
  );
}

export default App;
