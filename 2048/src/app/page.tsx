"use client"
import "../styles/globals.css";
import React, {useState} from "react";

export default function Home() {
  const rows = 4;
  const cols = 4;
  const [currentGrid, setCurrentGrid] = useState<number[][]>(
    Array.from({length: rows }, () => Array(cols).fill(0))
  )
  const createGrid = (currentGrid: number[][]) => {
    return currentGrid.map((row,rowIndex) => (
      <div key={rowIndex} className = "row">
        {row.map((cell, colIndex) => (
          <div key={`${rowIndex}-${colIndex}`} className="cell">
            {currentGrid[rowIndex][colIndex]}
          </div>
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

  return (
    <div className="grid-container">
      <h1>2048</h1>
      <p className="score">Score:{getScore(currentGrid)}</p>
      <div className="grid">{createGrid(currentGrid)}</div>
    </div>

  );
  };