"use client"
import "../styles/globals.css";
import React, {use, useEffect, useState} from "react";
import {randomValues} from "./randomValues"

export default function Home() {
  const rows = 4;
  const cols = 4;
  const arrayTwoOrFour = [2,2,2,4]

  const [gameState, setGameState] = useState("")

  const randomTwoOrFour = () => {
    const randomTwoOrFourIndex = Math.floor(getNextRandomValue()*4);
    return (arrayTwoOrFour[randomTwoOrFourIndex])
  };
  

  const [userNumber, setUserNumber] = useState(0)

  const [index, setIndex] = useState(userNumber);

  const getNextRandomValue = (): number => {
    if (index >= randomValues.length) {
      setIndex(0); // 配列が足りない場合はリセット
    }
    const value = randomValues[index];
    setIndex((prevIndex) => prevIndex + 1); // 次のインデックスに進む
    return value;
  };
  
  const randomLocation = (currentGrid: number[][]): number[][] => {
    // グリッドの値が0になってる部分をランダムに2か4にする
    const emptyLocation: [number,number][] = []
    currentGrid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell === 0) emptyLocation.push([rowIndex, colIndex])
      });
    });
    if (emptyLocation.length === 0) 
      {setGameState("Finish!");
      return currentGrid};
    const randomIndex = Math.floor(getNextRandomValue() * emptyLocation.length)
    currentGrid[emptyLocation[randomIndex][0]][emptyLocation[randomIndex][1]] = randomTwoOrFour()
    return currentGrid
  }

  const [currentGrid, setCurrentGrid] = useState<number[][]>(() => {
    const allZeroGrid = Array.from({length: rows }, () => Array(cols).fill(0));
    const initialGrid = randomLocation(allZeroGrid);
    return initialGrid;
  });

  const Cell: React.FC<{value: number}> = ({value}) => {
    return (
      <div className="cell">
        {value !== 0 ? value: null}
      </div>
    );
  };

  const showGrid = (currentGrid: number[][]) => {
    return currentGrid.map((row,rowIndex) => (
      <div key={rowIndex} className = "row">
        {row.map((cell, colIndex) => (
          <Cell key={`${rowIndex}-${colIndex}`} value={cell} />
      ))}
      </div>
    ))};
  
  const getScore = (currentGrid: number[][]) => {
    let totalAll = 0;
    for (let rowi = 0; rowi < rows; rowi++) {
      totalAll += currentGrid[rowi].reduce((sum, element) => sum + element);
    }
    return totalAll
  }

  const [pressedButton, setPressedButton] = useState<string>("")

  const moveGridNumbers = (grid: number[][], direction: string) => {
    if (direction === "up") {
      setIndex((index+1)%100)
      setCurrentGrid(updateUp(grid));
    }
    /*
    else if (direction === "down") {
      setIndex((index+2)%100)
      setCurrentGrid(updateDown(grid));
    }
    else if (direction === "right") {
      setIndex((index+3)%100)
      setCurrentGrid(updateRight(grid));
    }
    else if (direction === "left") {
      setIndex((index+4)%100)
      setCurrentGrid(updateLeft(grid));
    }
    */
    grid = randomLocation(grid)
  }

  const updateUp = (grid: number[][]) => {
    for (let colj=0;colj<cols;colj++) {
      // まずは0ある場所詰める
      for (let rowi=0;rowi<rows-1;rowi++) {
        let loopCount = 0
        while ((grid[rowi][colj] === 0 )&&(loopCount<4)) {
          grid[rowi][colj] = grid[rowi+1][colj]
          grid[rowi+1][colj] = 0
          loopCount += 1
        }
      }
      // 次に上下が同じ数だったら合体する
      for (let rowi=0;rowi<rows;rowi++) {
        for (let rowk = 0; rowk < 3; rowk++) {
          let sameCount = 0
          if (grid[rowk][colj] === grid[rowk+1][colj]) {

          }
        }
      }

    }
    // 最後に0になってる場所にランダムに2か4生成
    return grid
  }

  const updateDown = (grid: number[][]) => {
    
  }

  const updateRight = (grid: number[][]) => {
    
  }

  const updateLeft = (grid: number[][]) => {
    
  }

  const getButtonClick = (direction: string) => {
    setPressedButton(direction)
    moveGridNumbers(currentGrid,direction)
    console.log(pressedButton)
  }

  /*
  <div className="main-row">
    <button onClick={()=> gridReset()} className="inline-flex h-12 items-center justify-center rounded-md bg-blue-500 px-6 font-large text-neutral-50 transition active:scale-110"> Reset </button>
  </div>
  */

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