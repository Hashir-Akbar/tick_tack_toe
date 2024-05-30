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
  const [tokenClaimed, setTokenClaimed] = useState(false);

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
      setGameFinished(true);
      setTokenClaimed(false);
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
    setTokenClaimed(false); // Reset token claimed state for new game
  };

  const claimToken = () => {
    if (winner && !tokenClaimed) {
      if (winner === 'X') {
        setXTokens(xTokens + 1);
      } else if (winner === 'O') {
        setOTokens(oTokens + 1);
      }
      setTokenClaimed(true);
    }
  };

  return (
    <div className={styles.game}>
      <div>
        <div className={styles.status}>{status}</div>
        <div className={styles.tokens}>
          <div>X Tokens: {xTokens}</div>
          <div>O Tokens: {oTokens}</div>
        </div>
        <div className={styles.board}>
          {current.board.map((value, index) => (
            <button key={index} className={styles.square} onClick={() => handleClick(index)}>
              {value === 'X' && (
                <svg
                  fill="#000000"
                  width="256px"
                  height="256px"
                  viewBox="-4.8 -4.8 25.60 25.60"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#000000"
                  strokeWidth="0.8"
                >
                  <path d="M0 14.545L1.455 16 8 9.455 14.545 16 16 14.545 9.455 8 16 1.455 14.545 0 8 6.545 1.455 0 0 1.455 6.545 8z" fillRule="evenodd"></path>
                </svg>
              )}
              {value === 'O' && (
                <svg width="256px" height="256px" viewBox="-2.64 -2.64 29.28 29.28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke="#000000"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              )}
            </button>
          ))}
        </div>
        <div className={styles.buttons}>
          {winner && !tokenClaimed && (
            <button className={styles.claimToken} onClick={claimToken}>
              Win Token for {winner}
            </button>
          )}
          <button className={styles.reset} onClick={resetGame}>
            Reset
          </button>
        </div>
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
