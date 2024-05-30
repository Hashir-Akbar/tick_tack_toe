
"use client"

import { useState, useEffect } from 'react';
import styles from '../styles/TicTacToe.module.css';

type Player = 'X' | 'O' | null;

const TicTacToe: React.FC = () => {
  const [history, setHistory] = useState<{ board: Player[]; isXNext: boolean }[]>([
    { board: Array(9).fill(null), isXNext: true },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xTokens, setXTokens] = useState(0);
  const [oTokens, setOTokens] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);

  const current = history[stepNumber];
  const winner = calculateWinner(current.board);
  const tie = isBoardFull(current.board) && !winner;
  const status = winner
    ? `Winner: ${winner}`
    : tie
    ? "It's a tie!"
    : `Next player: ${current.isXNext ? 'X' : 'O'}`;

  useEffect(() => {
    if (winner && !gameFinished) {
      if (winner === 'X') {
        setXTokens((prev) => prev + 1);
      } else {
        setOTokens((prev) => prev + 1);
      }
      setGameFinished(true);
    }
  }, [winner, gameFinished]);

  const handleClick = (index: number) => {
    if (current.board[index] || winner || tie) return;

    const newBoard = current.board.slice();
    newBoard[index] = current.isXNext ? 'X' : 'O';
    setHistory(history.slice(0, stepNumber + 1).concat([{ board: newBoard, isXNext: !current.isXNext }]));
    setStepNumber(stepNumber + 1);
    setGameFinished(false); // Reset game finished state for new move
  };

  const jumpTo = (step: number) => {
    setStepNumber(step);
    setGameFinished(false); // Reset game finished state for history navigation
  };

  const resetGame = () => {
    setHistory([{ board: Array(9).fill(null), isXNext: true }]);
    setStepNumber(0);
    setGameFinished(false); // Reset game finished state for new game
  };

  return (

    <>
    <div className={styles.header_game}>
    <div className={styles.game}>
      
    
      <div className={styles.status}>{status}</div>
      <div className={styles.tokens}>
        <div>X Tokens: {xTokens}</div>
        <div>O Tokens: {oTokens}</div>
      </div>
      <div className={styles.board}>
        {current.board.map((value, index) => (
          <button key={index} className={styles.square} onClick={() => handleClick(index)}>
            {value}
          </button>
        ))}
      </div>
      <button className={styles.reset} onClick={resetGame}>
        Reset
      </button>
    
  
    </div>
    <div className={styles.history}>
        <ul>
          {history.map((step, move) => (
            <li key={move}>
              <button onClick={() => jumpTo(move)}>
                {move ? `Go to move #${move}` : 'Go to game start'}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>  
    </>
  );
};

const calculateWinner = (squares: Player[]): Player => {
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
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const isBoardFull = (board: Player[]): boolean => {
  return board.every(square => square !== null);
};

export default TicTacToe;
