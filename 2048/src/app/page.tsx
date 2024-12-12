"use client";

import "../styles/globals.css";
import React, {use, useEffect, useState} from "react";

export default function Home() {
  const rows = 4;
  const cols = 4;
  const arrayTwoOrFour = [2,2,2,4];

  const [gameState, setGameState] = useState("");

  const randomTwoOrFour = () => {
    const randomTwoOrFourIndex = Math.floor(Math.random()*4);
    return (arrayTwoOrFour[randomTwoOrFourIndex]);
  };

  const randomLocation = (grid: number[][]): number[][] => {
    // グリッドの値が0になってる部分をランダムに2か4にする
    const emptyLocation: [number,number][] = [];
    grid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell === 0) emptyLocation.push([rowIndex, colIndex])
      });
    });
    if (emptyLocation.length === 0) 
      {setGameState("Finish!");
      return grid};
    const randomIndex = Math.floor(Math.random() * emptyLocation.length);
    grid[emptyLocation[randomIndex][0]][emptyLocation[randomIndex][1]] = randomTwoOrFour();
    return grid;
  }

  const [currentGrid, setCurrentGrid] = useState<number[][]>(() => {
    const allZeroGrid = Array.from({length: rows }, () => Array(cols).fill(0));
    return allZeroGrid;
  });

  useEffect (() => {
    const initialGrid = Array.from({length: rows }, () => Array(cols).fill(0));
    setCurrentGrid(randomLocation(initialGrid));
  }, []);

  const Cell: React.FC<{value: number}> = ({value}) => {
    return (
      <div className="cell">
        {value !== 0 ? value: null}
      </div>
    );
  };

  const showGrid = (grid: number[][]) => {
    return grid.map((row,rowIndex) => (
      <div key={rowIndex} className = "row">
        {row.map((cell, colIndex) => (
          <Cell key={`${rowIndex}-${colIndex}`} value={cell} />
      ))}
      </div>
    ))
  };
  
  const getScore = (grid: number[][]) => {
    let totalAll = 0;
    for (let rowi = 0; rowi < rows; rowi++) {
      totalAll += grid[rowi].reduce((sum, element) => sum + element);
    }
    return totalAll;
  };

  const moveGridNumbers = (grid: number[][], direction: string) => {
    let updatedGrid;
    switch (direction) {
      case "up":
        updatedGrid = updateUp(grid);
        break;
      case "down":
        updatedGrid = updateDown(grid);
        break;
      case "right":
        updatedGrid = updateRight(grid);
        break;
      case "left":
        updatedGrid = updateLeft(grid);
        break;
      default:
        return;
    }
    const newGrid = randomLocation(updatedGrid);
    setCurrentGrid(newGrid);
    console.log(currentGrid)
  };

  const updateUp = (inputGrid: number[][]) => {
    const grid = inputGrid.map(row => [...row]);
    for (let colj=0;colj<cols;colj++) {
      // まずは0ある場所詰める
      for (let rowi=0;rowi<rows-1;rowi++) {
        let loopCount = 0;
        // 全部0の列があること考慮して最大4回のforループで抜けるように
        while ((grid[rowi][colj] === 0 )&&(loopCount<4)) {
          for (let k = rowi;k<rows-1;k++) {
          grid[k][colj] = grid[k+1][colj];
          }
        loopCount += 1;
        grid[rows-1][colj] = 0;
        }
      }
      // 次に上下が同じ数だったら合体する
      for (let rowk=0;rowk<rows-1;rowk++) {
        //同じやつが2個2組ずつ並んでる場合の処理
        if ((rowk === 0)&&(grid[0][colj]===grid[1][colj])&&(grid[2][colj]===grid[3][colj])) {
          grid[0][colj] = grid[0][colj]*2;
          grid[1][colj] = grid[2][colj]*2;
          grid[2][colj] = 0;
          grid[3][colj] = 0;
        }
        //同じやつが2-3個1組並んでいる場合の処理
        else if (grid[rowk][colj] === grid[rowk+1][colj]) {
          grid[rowk][colj] = grid[rowk][colj] * 2;
          grid[rowk+1][colj] = 0;
        }
      }
    }
    return grid;
  };

  const updateDown = (inputGrid: number[][]) => {
    const grid = inputGrid.map(row => [...row]);
    for (let colj = 0; colj < cols; colj++) {
      // まずは0ある場所詰める
      for (let rowi = rows - 1; rowi > 0; rowi--) {
        let loopCount = 0;
        // 全部0の列があること考慮して最大4回のforループで抜けるように
        while ((grid[rowi][colj] === 0) && (loopCount < 4)) {
          for (let k = rowi; k > 0; k--) {
            grid[k][colj] = grid[k-1][colj];
          }
          loopCount += 1;
          grid[0][colj] = 0;
        }
      }
      // 次に上下が同じ数だったら合体する
      for (let rowk = rows - 1; rowk > 0; rowk--) {
        //同じやつが2個2組ずつ並んでる場合の処理
        if ((rowk === rows - 1) && (grid[rows-1][colj] === grid[rows-2][colj]) && 
            (grid[rows-3][colj] === grid[rows-4][colj])) {
          grid[rows-1][colj] = grid[rows-1][colj] * 2;
          grid[rows-2][colj] = grid[rows-3][colj] * 2;
          grid[rows-3][colj] = 0;
          grid[rows-4][colj] = 0;
        }
        //同じやつが2-3個1組並んでいる場合の処理
        else if (grid[rowk][colj] === grid[rowk-1][colj]) {
          grid[rowk][colj] = grid[rowk][colj] * 2;
          grid[rowk-1][colj] = 0;
        }
      }
    }
    return grid;
  }

  const updateRight = (inputGrid: number[][]) => {
    const grid = inputGrid.map(row => [...row]);
    for (let rowi = 0; rowi < rows; rowi++) {
      // まずは0ある場所詰める
      for (let colj = cols - 1; colj > 0; colj--) {
        let loopCount = 0;
        // 全部0の列があること考慮して最大4回のforループで抜けるように
        while ((grid[rowi][colj] === 0) && (loopCount < 4)) {
          for (let k = colj; k > 0; k--) {
            grid[rowi][k] = grid[rowi][k-1];
          }
          loopCount += 1;
          grid[rowi][0] = 0;
        }
      }
      // 次に左右が同じ数だったら合体する
      for (let colk = cols - 1; colk > 0; colk--) {
        //同じやつが2個2組ずつ並んでる場合の処理
        if ((colk === cols - 1) && (grid[rowi][cols-1] === grid[rowi][cols-2]) && 
            (grid[rowi][cols-3] === grid[rowi][cols-4])) {
          grid[rowi][cols-1] = grid[rowi][cols-1] * 2;
          grid[rowi][cols-2] = grid[rowi][cols-3] * 2;
          grid[rowi][cols-3] = 0;
          grid[rowi][cols-4] = 0;
        }
        //同じやつが2-3個1組並んでいる場合の処理
        else if (grid[rowi][colk] === grid[rowi][colk-1]) {
          grid[rowi][colk] = grid[rowi][colk] * 2;
          grid[rowi][colk-1] = 0;
        }
      }
    }
    return grid;
  }

  const updateLeft = (inputGrid: number[][]) => {
    const grid = inputGrid.map(row => [...row]);
    for (let rowi = 0; rowi < rows; rowi++) {
      // まずは0ある場所詰める
      for (let colj = 0; colj < cols - 1; colj++) {
        let loopCount = 0;
        // 全部0の列があること考慮して最大4回のforループで抜けるように
        while ((grid[rowi][colj] === 0) && (loopCount < 4)) {
          for (let k = colj; k < cols - 1; k++) {
            grid[rowi][k] = grid[rowi][k+1];
          }
          loopCount += 1;
          grid[rowi][cols-1] = 0;
        }
      }
      // 次に左右が同じ数だったら合体する
      for (let colk = 0; colk < cols - 1; colk++) {
        //同じやつが2個2組ずつ並んでる場合の処理
        if ((colk === 0) && (grid[rowi][0] === grid[rowi][1]) && 
            (grid[rowi][2] === grid[rowi][3])) {
          grid[rowi][0] = grid[rowi][0] * 2;
          grid[rowi][1] = grid[rowi][2] * 2;
          grid[rowi][2] = 0;
          grid[rowi][3] = 0;
        }
        //同じやつが2-3個1組並んでいる場合の処理
        else if (grid[rowi][colk] === grid[rowi][colk+1]) {
          grid[rowi][colk] = grid[rowi][colk] * 2;
          grid[rowi][colk+1] = 0;
        }
      }
    }
    return grid;
    }

  const getButtonClick = (direction: string) => {
    moveGridNumbers(currentGrid,direction);
  }

  return (
    <div className="grid-container">      
      <h1>2048</h1>
      <p className="score">Score:{getScore(currentGrid)}</p>
      <div className="button-row">
        <button onClick={()=> getButtonClick("up")} className="inline-flex h-12 items-center justify-center rounded-md bg-blue-500 px-6 font-large text-neutral-50 transition active:scale-110"> ↑ </button>
      </div>
      <div className="main-row">
        <button onClick={() => getButtonClick("left")} className="side-button inline-flex h-12 items-center justify-center rounded-md bg-blue-500 px-6 font-large text-neutral-50 transition active:scale-110"> ← </button>
        <div className="grid">{showGrid(currentGrid)}</div>
        <button onClick={() => getButtonClick("right")} className="side-button inline-flex h-12 items-center justify-center rounded-md bg-blue-500 px-6 font-large text-neutral-50 transition active:scale-110"> → </button>
      </div>
      <div className="button-row">
        <button onClick={()=> getButtonClick("down")} className="inline-flex h-12 items-center justify-center rounded-md bg-blue-500 px-6 font-large text-neutral-50 transition active:scale-110"> ↓ </button>
      </div>
    </div>

  );
  };