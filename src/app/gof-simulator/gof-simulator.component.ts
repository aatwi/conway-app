import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { Cell, DEAD_CELL, LIVE_CELL } from '../model/cell';
import { SimulatorService } from './simulator.service';

@Component({
  selector: 'app-gof-simulator',
  standalone: true,
  imports: [CommonModule, MatGridListModule],
  templateUrl: './gof-simulator.component.html',
  styleUrl: './gof-simulator.component.css'
})
export class GofSimulatorComponent  {
  simulator: SimulatorService = new SimulatorService();

  cols: number = 6;

  grid: Cell[][] = [
    [ DEAD_CELL,  DEAD_CELL, DEAD_CELL,  DEAD_CELL,  DEAD_CELL,  DEAD_CELL],
    [ DEAD_CELL,  DEAD_CELL, DEAD_CELL,  DEAD_CELL,  DEAD_CELL,  DEAD_CELL],
    [ DEAD_CELL,  DEAD_CELL, LIVE_CELL,  LIVE_CELL,  LIVE_CELL,  DEAD_CELL],
    [ DEAD_CELL,  LIVE_CELL, LIVE_CELL,  LIVE_CELL,  DEAD_CELL,  DEAD_CELL],
    [ DEAD_CELL,  DEAD_CELL, DEAD_CELL,  DEAD_CELL,  DEAD_CELL,  DEAD_CELL],
    [ DEAD_CELL,  DEAD_CELL, DEAD_CELL,  DEAD_CELL,  DEAD_CELL,  DEAD_CELL]
  ];

  grid2: Cell[][] = [
    [ DEAD_CELL,  DEAD_CELL, DEAD_CELL,  DEAD_CELL,  DEAD_CELL],
    [ DEAD_CELL,  DEAD_CELL, LIVE_CELL,  DEAD_CELL,  DEAD_CELL],
    [ DEAD_CELL,  DEAD_CELL, LIVE_CELL,  DEAD_CELL,  DEAD_CELL],
    [ DEAD_CELL,  DEAD_CELL, LIVE_CELL,  DEAD_CELL,  DEAD_CELL],
    [ DEAD_CELL,  DEAD_CELL, DEAD_CELL,  DEAD_CELL,  DEAD_CELL]
  ];

  constructor() {
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.cols = 6;
  }

  generateNextState() {
    this.simulator.setGrid(this.grid);
    this.grid = this.simulator.generateNextState();
  }

  getColor(cell: Cell) {
    return cell === LIVE_CELL ? 'black' : 'white';
  }
}
