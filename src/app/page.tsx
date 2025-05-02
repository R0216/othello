'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const flat = board.flat();
  const blackCount = flat.filter((n) => n === 1).length;
  const whiteCount = flat.filter((n) => n === 2).length;
  const clickHandler = (x: number, y: number) => {
    console.log(x, y);
    const newBoard = structuredClone(board);
    const dire = [
      [0, -1],
      [1, -1],
      [1, 0],
      [1, 1],
      [0, 1],
      [-1, 1],
      [-1, 0],
      [-1, -1],
    ];

    if (board[y][x] === 0) {
      for (const [dy, dx] of dire) {
        for (let i = 1; i < 8; i += 1) {
          if (board[y + dy * i]?.[x + dx * i] !== 3 - turnColor) {
            break;
          }
          if (board[y + dy * (i + 1)]?.[x + dx * (i + 1)] === turnColor) {
            newBoard[y][x] = turnColor;

            for (let k = 1; k <= i; k += 1) {
              newBoard[y + dy * k][x + dx * k] = turnColor;
            }
          }
        }
      }
      if (newBoard[y][x] === turnColor) {
        setTurnColor(3 - turnColor);
      }
    }
    setBoard(newBoard);
  };
  return (
    <div className={styles.container}>
      <div className={styles.scoreboard}>
        score
        <div className={styles.scoreitem}>
          <span className={styles.blackstone} />
          {blackCount}
        </div>
        <div className={styles.scoreitem}>
          <span className={styles.whitestone} />
          {whiteCount}
        </div>
      </div>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cell} key={`${x}-${y}`} onClick={() => clickHandler(x, y)}>
              {color !== 0 && (
                <div
                  className={styles.stone}
                  style={{ background: color === 1 ? '#000' : '#fff' }}
                />
              )}
            </div>
          )),
        )}
      </div>
    </div>
  );
}
