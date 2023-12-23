import { Cell, DEAD_CELL, LIVE_CELL } from './../model/cell';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SimulatorService {
  private grid: Cell[][] = [];

  constructor() { }

  setGrid(world: Cell[][]) {
    this.grid = world;
  }

  countLiveNeighboursOf(xIndex: number, yIndex: number): number {
    let count = 0;

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) {
          continue;
        }
        if(this.isCellAtBorder(xIndex + i, yIndex + j, this.grid.length)) {
          continue;
        }
        if (this.grid[xIndex + i][yIndex + j] === LIVE_CELL) {
          count += 1;
        }
      }
    }

    return count;
  }

  isCellAtBorder(xIndex: number, yIndex: number, gridSize: number): boolean {
    return (xIndex < 0 || yIndex < 0 || xIndex >= gridSize || yIndex >= gridSize);
  }

  getNextCellState(xIndex: number, yIndex: number): Cell {
    let neighboursCount =  this.countLiveNeighboursOf(xIndex, yIndex);
    if(this.grid[xIndex][yIndex] === LIVE_CELL) {
      if(neighboursCount < 2 || neighboursCount > 3) {
        return DEAD_CELL;
      }
      if(neighboursCount === 2 || neighboursCount === 3) {
        return LIVE_CELL;
      }
    }
    if(this.grid[xIndex][yIndex] === DEAD_CELL && neighboursCount === 3) {
      return LIVE_CELL;
    }

    return DEAD_CELL;
  }

  generateNextState(): Cell[][] {
    let size = this.grid.length;
    let newGrid: Cell[][] = this.initializeGrid();

    for(let i = 0; i < size; i++) {
      for(let j = 0; j < size; j++) {
        newGrid[i][j] = this.getNextCellState(i, j);
      }
    }

    return newGrid;
  }

  private initializeGrid(): Cell[][]{
    let size = this.grid.length;
    let newGrid: Cell[][] = [];

    for(let i = 0; i < size; i++) {
      newGrid[i] = [];
      for(let y = 0; y < size; y++) {
        newGrid[i][y] = DEAD_CELL;
      }
    }

    return newGrid;
  }
}
